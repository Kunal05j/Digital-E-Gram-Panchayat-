import React, { useState } from 'react';
import { submitApplication } from '../../firebase/api';


export default function ApplyForm({ service, user }) {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const app = {
            serviceId: service.id,
            serviceTitle: service.title,
            applicantUid: user.uid,
            applicantName: user.name,
            data: form,
        };
        try {
            await submitApplication(app, user.uid);
            alert('Application submitted');
            setForm({});
        } catch (err) { alert(err.message); } finally { setLoading(false); }
    }


    return (
        <form className="card" onSubmit={onSubmit}>
            <h3>Apply for {service.title}</h3>
            <label>Enter details</label>
            <textarea value={JSON.stringify(form)} onChange={e => setForm(JSON.parse(e.target.value || '{}'))} placeholder='Enter JSON of application data for demo' />
            <div className="actions"><button className="btn primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button></div>
        </form>
    );
}