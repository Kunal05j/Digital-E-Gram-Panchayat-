import React, { useEffect, useState } from 'react';
import { listServices, deleteService } from '../../firebase/api';


export default function ServiceList({ actorUid }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);


    async function load() {
        setLoading(true);
        const s = await listServices();
        setServices(s);
        setLoading(false);
    }


    useEffect(() => { load(); }, []);


    async function handleDelete(id) {
        if (!window.confirm('Deactivate this service?')) return;
        await deleteService(id, actorUid);
        load();
    }


    return (
        <div className="card">
            <h3>Services</h3>
            {loading ? <div>Loading...</div> : (
                <ul>
                    {services.map(s => (
                        <li key={s.id} className="service-row">
                            <div>
                                <strong>{s.title}</strong>
                                <div className="muted">{s.description}</div>
                            </div>
                            <div>
                                <button className="btn secondary">Edit</button>
                                <button className="btn" onClick={() => handleDelete(s.id)}>Deactivate</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}