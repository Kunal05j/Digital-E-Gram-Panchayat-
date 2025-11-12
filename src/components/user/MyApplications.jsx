import React, { useEffect, useState } from 'react';
import { listApplicationsForUser } from '../../firebase/api';


export default function MyApplications({ user }) {
    const [list, setList] = useState([]);
    useEffect(() => { load(); }, [user]);
    async function load() {
        const l = await listApplicationsForUser(user.uid);
        setList(l);
    }
    return (
        <div className="card">
            <h3>My Applications</h3>
            <ul>
                {list.map(a => (
                    <li key={a.id} className="app-row">
                        <div>
                            <strong>{a.serviceTitle}</strong>
                            <div className="muted">{a.status}</div>
                        </div>
                        <div>{/* actions */}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}