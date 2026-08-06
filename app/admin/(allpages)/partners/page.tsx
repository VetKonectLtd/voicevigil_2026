"use client";

import { useState } from "react";
import { usePartnerListing } from "@/lib/hooks";

const statusColors: Record<string, string> = {
  Active: "bg-green-50 text-green-700",
  Pending: "bg-yellow-50 text-yellow-700",
  Inactive: "bg-slate-100 text-slate-500",
};

export default function PartnerListPage() {
  const [page] = useState(1);
  const [limit] = useState(25);

  const { data, isLoading, error } = usePartnerListing(page, limit);

  const partners = data?.data || [];

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="font-semibold">Failed to load partners</p>
        <p className="text-sm mt-1">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Partner List</h2>
          <p className="mt-1 text-sm text-slate-500">Overview of partnership requests</p>
        </div>

        <div className="rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Total partners: {partners.length}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4">Full Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-400">
                  Loading partnership requests...
                </td>
              </tr>
            ) : partners.length > 0 ? (
              partners.map((partner: any, idx: number) => (
                <tr
                  key={partner.email || idx}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-medium text-slate-900">{partner.fullname}</td>

                  <td className="px-5 py-4">{partner.email}</td>

                  <td className="px-5 py-4">{partner.contact}</td>

                  <td className="px-5 py-4 text-slate-500">
                    {new Date(partner.part_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusColors["Pending"]
                      }`}
                    >
                      Pending
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-400">
                  No partnership requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
