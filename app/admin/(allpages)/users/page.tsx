"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserListing } from "@/lib/hooks";
import { useState } from "react";

export default function RegisteredUsersPage() {
  const [search, setSearch] = useState("");

  const { user, token } = useAuth();

  // Pass current active auth identity states to the async call hook
  const { data, isLoading, error } = useUserListing(1, 50, user?.id ?? null, token);

  console.log({ user, token });

  const usersList = data?.data || [];

  const filteredUsers = usersList.filter((u) => {
    const searchString = `${u.first_name} ${u.last_name} ${u.u_email}`.toLowerCase();
    return searchString.includes(search.toLowerCase());
  });

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Error loading registered users</p>
        <p className="text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Registered users</h2>
          <p className="mt-1 text-sm text-slate-500">Overview of registered user</p>
        </div>
        <div className="max-w-[300px]">
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#1565C0] focus:bg-white"
          />
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">First Name</th>
              <th className="px-5 py-4">Last Name</th>
              <th className="px-5 py-4">Email Address</th>
              <th className="px-5 py-4">Date Joined</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  Loading database records...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => (
                <tr
                  key={user.u_email || idx}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">{user.first_name}</td>
                  <td className="px-5 py-4">{user.last_name}</td>
                  <td className="px-5 py-4">{user.u_email}</td>
                  <td className="px-5 py-4 text-slate-500">
                    {new Date(user.reg_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
