import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../mutations';
import { GET_USERS } from '../queries';

function CreateUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUser, { loading, error }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }]
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ variables: { name, email, password } });
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New User</h2>
            {error && <p style={{ color: 'red' }}>Error creating user: {error.message}</p>}
            <div>
                <label>Name: <input value={name} onChange={e => setName(e.target.value)} /></label>
            </div>
            <div>
                <label>Email: <input value={email} onChange={e => setEmail(e.target.value)} /></label>
            </div>
            <div>
                <label>Password: <input type="password" value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
            <button type="submit" disabled={loading}>Create</button>
        </form>
    );
}

export default CreateUserForm;
