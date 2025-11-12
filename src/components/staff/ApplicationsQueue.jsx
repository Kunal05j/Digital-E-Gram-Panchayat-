import React, { useEffect, useState } from 'react';
import { listApplicationsByService, updateApplicationStatus } from '../../firebase/api';


export default function ApplicationsQueue({ serviceId, actorUid }) {
    const [apps, setApps] = useState([]);
    useEffect(() => { load(); }, [serviceId]);
    async function load() {
        const list = await listApplicationsByService(serviceId);
        setApps(list);
    }


    async function changeStatus(id, status) {
        await updateApplicationStatus(id, status, actorUid);
        load();
    }


    return (
        <div className="card">
            <h3>Applications</h3>
            <ul>
                {apps.map(a => (
                    <li key={a.id} className="app-row">
                        <div>
                            <strong>{a.applicantName}</strong>
                            <div className="muted">{a.status} • {new Date(a.createdAt?.seconds ? a.createdAt.seconds * 1000 : Date.now()).toLocaleString()}</div>
                        </div>
                        <div>
                            <button className="btn secondary" onClick={() => changeStatus(a.id, 'in_review')}>In Review</button>
                            <button className="btn" onClick={() => changeStatus(a.id, 'approved')}>Approve</button>
                            <button className="btn" onClick={() => changeStatus(a.id, 'rejected')}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}