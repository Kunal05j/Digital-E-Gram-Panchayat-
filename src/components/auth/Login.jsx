import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../firebase/api';


export default function Login({ setAppUser }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();


    async function onSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
            const profile = await getUser(cred.user.uid);
            setAppUser({ uid: cred.user.uid, ...profile });
            nav('/');
        } catch (err) { alert(err.message); } finally { setLoading(false); }
    }


    return (
        <div className="auth-card card">
            <h3>Login</h3>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <label>Password</label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                <div className="actions">
                    <button className="btn primary" disabled={loading}>{loading ? 'Signing...' : 'Login'}</button>
                </div>
            </form>
        </div>
    );
}