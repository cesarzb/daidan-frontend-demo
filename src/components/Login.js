import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutations";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await loginUser({ variables: { email, password } });
    if (data && data.loginUser && data.loginUser.token) {
      localStorage.setItem("token", data.loginUser.token);
      onLogin();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-600 text-center">Login</h2>
      {error && (
        <p className="text-red-500 text-center">
          Error logging in: {error.message}
        </p>
      )}
      <div>
        <label className="block font-medium mb-1">
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            required
          />
        </label>
      </div>
      <div>
        <label className="block font-medium mb-1">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white font-semibold rounded ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
