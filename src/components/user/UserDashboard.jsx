import React, { useEffect, useState } from 'react';
import { listServices } from '../../firebase/api';
import ApplyForm from './ApplyForm';
import MyApplications from './MyApplications';


export default function UserDashboard({ user }) {
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => { load(); }, []);
    async function load() {
        const s = await listServices();
        setServices(s);
    }
    return (
        <div>
            <h2>Welcome, {user.name}</h2>
            <div className="grid">
                <div>
                    <div className="card">
                        <h3>Available Services</h3>
                        <ul>
                            {services.map(s => (
                                <li key={s.id} className="service-row">
                                    <div>
                                        <strong>{s.title}</strong>
                                        <div className="muted">{s.description}</div>
                                    </div>
                                    <div>
                                        <button className="btn primary" onClick={() => setSelected(s)}>Apply</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {selected && <ApplyForm service={selected} user={user} />}
                    <MyApplications user={user} />
                </div>
            </div>
        </div>
    );
}