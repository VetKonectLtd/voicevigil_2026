const partners = [
  { name: 'Mojibola Bello', status: 'Active' },
  { name: 'Majik Femi', status: 'Pending' },
  { name: 'Adeela Wale', status: 'Active' },
  { name: 'Ayinde Adenola', status: 'Active' },
  { name: 'Femi Adebayo', status: 'Pending' },
  { name: 'Tola Wakinton', status: 'Active' },
  { name: 'Tope Alao', status: 'Inactive' },
]

const statusColors: Record<string, string> = {
  Active: 'bg-green-50 text-green-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Inactive: 'bg-slate-100 text-slate-500',
}

export default function PartnerListPage() {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Partner List</h2>
          <p className="mt-1 text-sm text-slate-500">Overview of your partner list</p>
        </div>
        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Total partners: {partners.length}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">Full Name</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.name} className="border-t border-slate-200 hover:bg-slate-50">
                <td className="px-5 py-4">{partner.name}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[partner.status] ?? ''}`}
                  >
                    {partner.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
