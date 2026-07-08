import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";
import UserModal from "../components/UserModal";
import { Search, ChevronRight, Trash2, Users as UsersIcon } from "lucide-react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("full_name");

    if (error) {
      console.error(error);
    } else {
      setUsers(data);
    }

    setLoading(false);
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.full_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (user.email ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  async function updateRole(id, role) {
    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }

  async function deleteUser(id) {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    const { error } = await supabase.from("profiles").delete().eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchUsers();
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
          <span>AI Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal-600 font-medium">Users</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
            <UsersIcon className="w-[18px] h-[18px] text-teal-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Users
            </h1>

            <p className="text-[13px] text-gray-500">
              Manage roles and access across your team.
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-teal-100 rounded-xl p-10 flex items-center justify-center text-gray-500 text-sm">
          Loading users...
        </div>
      ) : (
        <div className="bg-white border border-teal-100 rounded-xl shadow-sm shadow-teal-300/40 overflow-hidden">
          <div className="flex flex-row gap-3 p-4 border-b border-teal-50">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />

              <input
                type="text"
                placeholder="Search users..."
                className="h-[38px] w-full pl-8 pr-3 text-[13px] bg-gray-50 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="h-[38px] px-3 text-[13px] border border-gray-200 rounded-lg outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <table className="w-full">
            <thead className="bg-teal-50/60">
              <tr>
                <th className="text-left p-4 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left p-4 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                  Email
                </th>
                <th className="text-left p-4 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                  Role
                </th>
                <th className="p-4 text-center text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-gray-500 text-sm"
                  >
                    No users match your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-teal-50 hover:bg-teal-50/30 transition-colors"
                  >
                    <td className="p-4">
                      <button
                        className="text-teal-600 hover:text-teal-700 hover:underline font-medium text-[13.5px]"
                        onClick={() => setSelectedUser(user)}
                      >
                        {user.full_name}
                      </button>
                    </td>
                    <td className="p-4 text-[13.5px] text-gray-600">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <select
                        className="border border-gray-200 rounded-lg px-2 py-1.5 text-[13px] outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-500/10 transition-all"
                        value={user.role}
                        onChange={(e) => updateRole(user.id, e.target.value)}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                      </select>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </Layout>
  );
}
