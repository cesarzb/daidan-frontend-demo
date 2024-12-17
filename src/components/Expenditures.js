import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENDITURES } from "../queries";
import {
  CREATE_EXPENDITURE,
  UPDATE_EXPENDITURE,
  DELETE_EXPENDITURE,
} from "../mutations";

function Expenditures() {
  const { data, loading, error } = useQuery(GET_EXPENDITURES);
  const [createExpenditure] = useMutation(CREATE_EXPENDITURE, {
    refetchQueries: [{ query: GET_EXPENDITURES }],
  });
  const [updateExpenditure] = useMutation(UPDATE_EXPENDITURE, {
    refetchQueries: [{ query: GET_EXPENDITURES }],
  });
  const [deleteExpenditure] = useMutation(DELETE_EXPENDITURE, {
    refetchQueries: [{ query: GET_EXPENDITURES }],
  });

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExpenditure({ variables: { name, cost: parseFloat(cost) } });
    setName("");
    setCost("");
  };

  const handleUpdate = async (id, name, cost) => {
    await updateExpenditure({
      variables: { id, name, cost: parseFloat(cost) },
    });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await deleteExpenditure({ variables: { id } });
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
            {editingId === exp.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  defaultValue={exp.name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  type="number"
                  defaultValue={exp.cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={() =>
                    handleUpdate(exp.id, name || exp.name, cost || exp.cost)
                  }
                  className="py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="ml-2 py-1 px-3 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <strong className="text-lg">{exp.name}</strong> -{" "}
                <span className="text-green-600">${exp.cost.toFixed(2)}</span>
                <br />
                <small className="text-gray-600">
                  Owner: {exp.user.name} ({exp.user.email})
                </small>
                <div className="mt-2">
                  <button
                    onClick={() => setEditingId(exp.id)}
                    className="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="ml-2 py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-4">Add New Expenditure</h3>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded-md"
      >
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
          className="w-full py-2 text-white font-semibold rounded bg-blue-500 hover:bg-blue-600"
        >
          Add Expenditure
        </button>
      </form>
    </div>
  );
}

export default Expenditures;
