import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../queries';

function Users() {
    const { data, loading, error } = useQuery(GET_USERS);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    return (
        <div style={{ marginBottom: '1rem' }}>
            <h2>Users</h2>
            <ul>
                {data.users.map(u => (
                    <li key={u.id}>{u.name} - {u.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
