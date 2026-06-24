"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllCompaniesAction } from "@/app/actions/companies/get";

import type { Company, Prisma } from "@/app/generated/prisma/client";

type CompanyBasic = Company;
type CompanyWithSourcesAndBrand = Prisma.CompanyGetPayload<{
  include: {
    sources: true,
    brands: true
  }
}>;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState < string | null > (null);

  useEffect(() => {
    // Kita buat fungsi anonim async langsung di dalam dan langsung dieksekusi!
    (async () => {
      try {
        const result = await getAllCompaniesAction();
        
        if (result.success) {
          setCompanies(result.data as Company[]);
        } else {
          setError(result.message || "Gagal mengambil data.");
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // ◄ Matikan loading di paling akhir!
      }
    })(); // ◄ Tanda kurung ini artinya fungsi langsung berjalan otomatis
  }, []);
  
  return (
    <div className="">
      
      <header className="w-full flex justify-between bg-cyan-200 px-4 py-4 rounded-sm shadow-sm">
        
        <div className="font-bold text-taupe-950 text-xl">Atlas</div>

        <nav className="items-end-safe flex justify-between gap-4 text-slate-800">
          <Link href="/" className="hover:text-slate-200  transition-colors duration-200">Home</Link>
        </nav>
        
      </header>

      <div className="py-4 px-4">
        <Link href="dashboard" className="bg-amber-50 px-4 text-slate-950 py-2 rounded-sm shadow-sm">Back</Link>
      </div>

      <main>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Perusahaan Atlas</h1>
        
              {loading && <p className="text-blue-500 text-sm">Sedang mengambil data database...</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
        
              {!loading && !error && (
                <div className="overflow-x-auto mt-4 border rounded">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 text-gray-700 font-bold">
                      <tr>
                        <th className="px-4 py-2 text-left">Nama Perusahaan</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-600">
                      {companies.length === 0 ? (
                        <tr>
                          <td colSpan={2} className="px-4 py-4 text-center text-gray-400">
                            Belum ada data perusahaan.
                          </td>
                        </tr>
                      ) : (
                        companies.map((company) => (
                          <tr key={company.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 font-medium">{company.name}</td>
                            <td className="px-4 py-2">
                              <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100">
                                {company.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
      </main>

    </div>
  )
}