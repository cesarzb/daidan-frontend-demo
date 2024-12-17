import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import Login from "./components/Login";
import Users from "./components/Users";
import CreateUserForm from "./components/CreateUserForm";
import Expenditures from "./components/Expenditures";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="max-w-3xl mx-auto p-4 bg-gray-100 min-h-screen shadow-md">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
            Daidan GraphQL Demo
          </h1>
          {loggedIn && (
            <nav className="flex justify-center gap-4 mb-6">
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Home
              </Link>
              <Link
                to="/expenditures"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Expenditures
              </Link>
            </nav>
          )}
          {!loggedIn && (
            <div className="flex justify-center">
              <Login onLogin={() => setLoggedIn(true)} />
            </div>
          )}
          {loggedIn && (
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                    <Users />
                    <CreateUserForm />
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          setLoggedIn(false);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                }
              />
              <Route path="/expenditures" element={<Expenditures />} />
            </Routes>
          )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
