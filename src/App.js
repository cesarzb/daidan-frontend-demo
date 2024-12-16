import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import Login from './components/Login';
import Users from './components/Users';
import CreateUserForm from './components/CreateUserForm';

function App() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    return (
        <ApolloProvider client={client}>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
                <h1>Daidan GraphQL Demo</h1>
                {!loggedIn && <Login onLogin={() => setLoggedIn(true)} />}
                {loggedIn && (
                    <>
                        <Users />
                        <CreateUserForm />
                        <button onClick={() => { localStorage.removeItem('token'); setLoggedIn(false); }}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </ApolloProvider>
    );
}

export default App;
