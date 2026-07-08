import { useEffect, useState } from "react";

import {
  getUsers,
  getProjectMembers,
  addMember,
  removeMember,
} from "../services/projectMembers";

export default function AssignMembers({ projectId }) {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setUsers(await getUsers());
    setMembers(await getProjectMembers(projectId));
  }

  const availableUsers = users.filter(
    (user) => !members.some((member) => member.user_id === user.id),
  );

  async function assign() {
    if (!selected) return;

    await addMember(projectId, selected);
    setSelected("");
    load();
  }

  async function remove(id) {
    await removeMember(id);
    load();
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 mt-5">
      <h2 className="text-[15px] font-semibold text-gray-900 mb-4">
        Assign Team Members
      </h2>

      <div className="flex gap-3">
        <select
          className="border border-gray-200 rounded-lg p-2 flex-1 text-[13.5px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select employee</option>

          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>

        <button
          onClick={assign}
          disabled={!selected}
          className="bg-teal-600 text-white px-4 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>

      <div className="mt-5">
        {members.length === 0 ? (
          <p className="text-[13.5px] text-gray-500">
            No members assigned yet.
          </p>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex justify-between items-center border-b border-teal-50 py-2 last:border-b-0"
            >
              <span className="text-[13.5px] text-gray-900">
                {member.profiles.full_name}
              </span>

              <button
                className="text-red-600 hover:text-red-700 text-[13px] font-medium"
                onClick={() => remove(member.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
