import React from 'react';
import ServiceList from './ServiceList';
import ServiceForm from './ServiceForm';


export default function AdminDashboard({ appUser }) {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div className="grid">
                <div>
                    <ServiceForm actorUid={appUser.uid} onSaved={() => { /* refresh here if needed */ }} />
                </div>
                <div>
                    <ServiceList actorUid={appUser.uid} />
                </div>
            </div>
        </div>
    );
}