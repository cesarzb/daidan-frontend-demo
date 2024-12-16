import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../mutations';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await loginUser({ variables: { email, password } });
        if (data && data.loginUser && data.loginUser.token) {
            localStorage.setItem('token', data.loginUser.token);
            onLogin();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>Error logging in: {error.message}</p>}
            <div>
                <label>Email: <input value={email} onChange={e => setEmail(e.target.value)} /></label>
            </div>
            <div>
                <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
            <button type="submit" disabled={loading}>Login</button>
        </form>
    );
}

export default Login;
