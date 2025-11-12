import React from 'react';
import { Link } from 'react-router-dom';
export default function Header({ user, onLogout }) {
    return (
        <header className="app-header card">
            <div className="header-left">
                <h2>Digital E Gram Panchayat</h2>
            </div>
            <div className="header-right">
                {user ? (
                    <>
                        <span className="muted">{user.name}</span>
                        <button className="btn secondary" onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn primary">Login</Link>
                )}
            </div>
        </header>
    );
}