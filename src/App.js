import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import Loading from "./components/ui/Loading";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/staff/StaffDashboard";
import UserDashboard from "./components/user/UserDashboard";
import PrivateRoute from "./components/auth/PrivateRoute";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getUser } from "./firebase/api";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [appUser, setAppUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUser(user.uid);
        setAppUser({ uid: user.uid, ...(profile || {}) });
      } else {
        setAppUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    setAppUser(null);
    nav("/login");
  }

  if (loading) return <Loading />;

  return (
    <div className="container">
      <Header user={appUser} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/login" element={<Login setAppUser={setAppUser} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute appUser={appUser} role="admin">
                <AdminDashboard appUser={appUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <PrivateRoute appUser={appUser} role="staff">
                <StaffDashboard appUser={appUser} />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute appUser={appUser}>
                <UserDashboard user={appUser} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
