import RegisteredUsersPage from "./users/page";

const stats = [
  { label: "Registered User", value: "8" },
  { label: "Blog", value: "2" },
  { label: "Partner List", value: "5" },
];

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
      <RegisteredUsersPage />
    </div>
  );
}
