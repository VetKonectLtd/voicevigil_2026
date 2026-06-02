'use client'

import { useState } from 'react'

const users = [
  { firstName: 'Mojibola', lastName: 'Bello', email: 'PakoKitts@gmail.com', joined: 'Mar 14, 2026' },
  { firstName: 'Majik', lastName: 'Femi', email: 'JohnSmith@gmail.com', joined: 'Mar 15, 2026' },
  { firstName: 'Adeela', lastName: 'Wale', email: 'SarahLee@gmail.com', joined: 'Mar 16, 2026' },
  { firstName: 'Ayinde', lastName: 'Adenola', email: 'EmmaWatson@gmail.com', joined: 'Mar 17, 2026' },
  { firstName: 'Femi', lastName: 'Adebayo', email: 'OliverBrown@gmail.com', joined: 'Mar 18, 2026' },
  { firstName: 'Tola', lastName: 'Wakinton', email: 'SamanthaGreen@gmail.com', joined: 'Mar 19, 2026' },
  { firstName: 'Tope', lastName: 'Alao', email: 'LucasWhite@gmail.com', joined: 'Mar 20, 2026' },
]

export default function RegisteredUsersPage() {
  const [search, setSearch] = useState('')

  const filtered = users.filter(
    (u) =>
      `${u.firstName} ${u.lastName} ${u.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  )

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
            {filtered.length > 0 ? (
              filtered.map((user) => (
                <tr key={user.email} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-5 py-4">{user.firstName}</td>
                  <td className="px-5 py-4">{user.lastName}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.joined}</td>
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
  )
}
