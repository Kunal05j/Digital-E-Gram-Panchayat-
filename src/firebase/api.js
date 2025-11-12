// src/firebase/api.js
import { db, now } from "./firebaseConfig";
import {
    collection,
    addDoc,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";

/* -----------------------------
   LOGGING HELPER
----------------------------- */
export async function writeLog(actorUid, action, details = {}) {
    try {
        await addDoc(collection(db, "logs"), {
            actorUid,
            action,
            details,
            createdAt: now(),
        });
    } catch (err) {
        console.error("writeLog error", err);
    }
}

/* -----------------------------
   USER HELPERS
----------------------------- */
export async function createUserDoc(uid, data) {
    await setDoc(doc(db, "users", uid), { ...data, createdAt: now() });
    await writeLog(uid, "create_user", { uid });
}

export async function getUser(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data() : null;
}

/* -----------------------------
   ADMIN: SERVICES CRUD
----------------------------- */
export async function createService(service, actorUid) {
    const ref = await addDoc(collection(db, "services"), {
        ...service,
        active: true,
        createdAt: now(),
    });
    await writeLog(actorUid, "create_service", {
        id: ref.id,
        title: service.title,
    });
    return ref.id;
}

export async function updateService(id, data, actorUid) {
    await updateDoc(doc(db, "services", id), { ...data, updatedAt: now() });
    await writeLog(actorUid, "update_service", { id, data });
}

export async function deleteService(id, actorUid) {
    await updateDoc(doc(db, "services", id), {
        active: false,
        updatedAt: now(),
    });
    await writeLog(actorUid, "delete_service", { id });
}

export async function listServices() {
    const q = query(
        collection(db, "services"),
        where("active", "==", true),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/* -----------------------------
   APPLICATIONS
----------------------------- */
export async function submitApplication(app, actorUid) {
    const ref = await addDoc(collection(db, "applications"), {
        ...app,
        status: "submitted",
        createdAt: now(),
        updatedAt: now(),
    });
    await writeLog(actorUid, "submit_application", {
        appId: ref.id,
        serviceId: app.serviceId,
    });
    return ref.id;
}

export async function updateApplicationStatus(appId, status, actorUid) {
    await updateDoc(doc(db, "applications", appId), {
        status,
        updatedAt: now(),
    });
    await writeLog(actorUid, "update_application_status", { appId, status });
}

export async function listApplicationsByService(serviceId) {
    const q = query(
        collection(db, "applications"),
        where("serviceId", "==", serviceId),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function listApplicationsForUser(uid) {
    const q = query(
        collection(db, "applications"),
        where("applicantUid", "==", uid),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
