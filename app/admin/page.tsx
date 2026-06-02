const stats = [
  { label: 'Registered User', value: '8' },
  { label: 'Blog', value: '2' },
  { label: 'Partner List', value: '5' },
]

const recentUsers = [
  ['Mojibola', 'Bello', 'PakoKitts@gmail.com', 'Mar 14, 2026'],
  ['Majik', 'Femi', 'JohnSmith@gmail.com', 'Mar 15, 2026'],
  ['Adeela', 'Wale', 'SarahLee@gmail.com', 'Mar 16, 2026'],
  ['Ayinde', 'Adenola', 'EmmaWatson@gmail.com', 'Mar 17, 2026'],
  ['Femi', 'Adebayo', 'OliverBrown@gmail.com', 'Mar 18, 2026'],
  ['Tola', 'Wakinton', 'SamanthaGreen@gmail.com', 'Mar 19, 2026'],
  ['Tope', 'Alao', 'LucasWhite@gmail.com', 'Mar 20, 2026'],
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <h2 className="text-xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-500">Overview of your activity</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-[#F8FAFF] p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent users table */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Registered User</h3>
            <p className="text-sm text-slate-500">Overview of registered user</p>
          </div>
          <div className="max-w-[320px]">
            <input
              type="search"
              placeholder="Search"
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
              {recentUsers.map((row) => (
                <tr key={row[2]} className="border-t border-slate-200 hover:bg-slate-50">
                  {row.map((cell) => (
                    <td key={cell} className="px-5 py-4">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
