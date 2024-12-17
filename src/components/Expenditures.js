import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENDITURES } from "../queries";
import { CREATE_EXPENDITURE } from "../mutations";

function Expenditures() {
  const { data, loading, error } = useQuery(GET_EXPENDITURES);
  const [createExpenditure, { loading: creating, error: createError }] =
    useMutation(CREATE_EXPENDITURE, {
      refetchQueries: [{ query: GET_EXPENDITURES }],
      awaitRefetchQueries: true,
    });

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpenditure({ variables: { name, cost: parseFloat(cost) } });
      setName("");
      setCost("");
    } catch (err) {}
  };

  if (loading) return <p className="text-gray-700">Loading expenditures...</p>;
  if (error)
    return (
      <p className="text-red-500">
        Error fetching expenditures: {error.message}
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Expenditures</h2>
      <ul className="space-y-2 mb-6">
        {data.expenditures.map((exp) => (
          <li
            key={exp.id}
            className="border-b border-gray-200 pb-2 last:border-b-0"
          >
            <strong className="text-lg">{exp.name}</strong> -{" "}
            <span className="text-green-600">${exp.cost.toFixed(2)}</span>
            <br />
            <small className="text-gray-600">
              Owner: {exp.user.name} ({exp.user.email})
            </small>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-4">Add New Expenditure</h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded-md"
      >
        {createError && (
          <p className="text-red-500">
            Error creating expenditure: {createError.message}
          </p>
        )}
        <div>
          <label className="block font-medium mb-1">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Cost:
            <input
              type="number"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={creating}
          className={`w-full py-2 text-white font-semibold rounded ${
            creating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {creating ? "Adding..." : "Add Expenditure"}
        </button>
      </form>
    </div>
  );
}

export default Expenditures;
