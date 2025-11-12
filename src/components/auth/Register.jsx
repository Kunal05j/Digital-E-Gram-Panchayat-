import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { createUserDoc } from '../../firebase/api';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();


    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            await createUserDoc(cred.user.uid, { name: form.name, email: form.email, role: 'user' });
            nav('/');
        } catch (err) {
            alert(err.message);
        } finally { setLoading(false); }
    }


    return (
        <div className="auth-card card">
            <h3>Register</h3>
            <form onSubmit={onSubmit}>
                <label>Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <label>Email</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <label>Password</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <div className="actions">
                    <button className="btn primary" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
                </div>
            </form>
        </div>
    );
}