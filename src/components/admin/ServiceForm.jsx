import React, { useState } from 'react';
import { createService, updateService } from '../../firebase/api';


export default function ServiceForm({ editing, onSaved, actorUid }) {
    
    const [form, setForm] = useState(editing || { title: '', description: '' });
    const [loading, setLoading] = useState(false);


    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                await updateService(editing.id, form, actorUid);
                onSaved();
            } else {
                await createService(form, actorUid);
                setForm({ title: '', description: '' });
                onSaved();
            }
        } catch (err) { alert(err.message); } finally { setLoading(false); }
    }


    return (
        <form className="card" onSubmit={onSubmit}>
            <label>Title</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <div className="actions">
                <button className="btn primary" disabled={loading}>{editing ? 'Update' : 'Create'}</button>
            </div>
        </form>
    );
}