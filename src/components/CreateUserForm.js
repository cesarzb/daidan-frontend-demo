import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../mutations";
import { GET_USERS } from "../queries";

function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser({ variables: { name, email, password } });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-50 p-6 shadow-md rounded-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">
        Create New User
      </h2>
      {error && (
        <p className="text-red-500 text-center">
          Error creating user: {error.message}
        </p>
      )}
      <div>
        <label className="block font-medium mb-1">
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
      <div>
        <label className="block font-medium mb-1">
          Email:
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default CreateUserForm;
