import React from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../queries";

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p className="text-gray-700">Loading users...</p>;
  if (error)
    return (
      <p className="text-red-500">Error fetching users: {error.message}</p>
    );

  return (
    <div className="mb-6 bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Users</h2>
      <ul className="list-disc list-inside space-y-2">
        {data.users.map((u) => (
          <li key={u.id} className="text-gray-700">
            <span className="font-medium">{u.name}</span> -{" "}
            <span className="text-gray-500">{u.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
