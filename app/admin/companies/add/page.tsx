"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCompanyAction } from "@/app/actions/companies/add";

export default function NewCompanyFormPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Inisialisasi State Kompleks sesuai struktur Prisma lib-mu
  const [form, setForm] = useState({
    name: "",
    ticker: "",
    country: "",
    logo: "",
    description: "",
    status: "UNKNOWN" as "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN",
    sources: [] as { title: string; link: string }[],
    brands: [] as { name: string; products: { name: string }[] }[],
  });

  // ==========================================
  // LOGIKA DINAMIS UNTUK SOURCES
  // ==========================================
  const addSource = () => {
    setForm({ ...form, sources: [...form.sources, { title: "", link: "" }] });
  };

  const handleSourceChange = (index: number, field: "title" | "link", value: string) => {
    const updatedSources = [...form.sources];
    updatedSources[index][field] = value;
    setForm({ ...form, sources: updatedSources });
  };

  // ==========================================
  // LOGIKA DINAMIS UNTUK BRANDS & PRODUCTS
  // ==========================================
  const addBrand = () => {
    setForm({ ...form, brands: [...form.brands, { name: "", products: [] }] });
  };

  const handleBrandNameChange = (brandIndex: number, value: string) => {
    const updatedBrands = [...form.brands];
    updatedBrands[brandIndex].name = value;
    setForm({ ...form, brands: updatedBrands });
  };

  const addProductToBrand = (brandIndex: number) => {
    const updatedBrands = [...form.brands];
    updatedBrands[brandIndex].products.push({ name: "" });
    setForm({ ...form, brands: updatedBrands });
  };

  const handleProductChange = (brandIndex: number, productIndex: number, value: string) => {
    const updatedBrands = [...form.brands];
    updatedBrands[brandIndex].products[productIndex].name = value;
    setForm({ ...form, brands: updatedBrands });
  };

  // ==========================================
  // SUBMIT HANDLER
  // ==========================================
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Kirim objek raksasa ini langsung ke Server Action
    const result = await createCompanyAction(form);

    setIsSubmitting(false);

    if (result.success) {
      alert(result.message);
      router.push("/admin/companies");
    } else {
      setError(result.message || "Gagal membuat data perusahaan.");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md my-10 text-black">
      <h2 className="text-xl font-bold mb-4">Tambah Data Perusahaan Kompleks</h2>
      
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- DATA UTAMA COMPANY --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nama Perusahaan *</label>
            <input type="text" className="w-full border p-2 rounded mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Ticker</label>
            <input type="text" className="w-full border p-2 rounded mt-1" value={form.ticker} onChange={(e) => setForm({ ...form, ticker: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select className="w-full border p-2 rounded mt-1" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
            <option value="UNKNOWN">UNKNOWN</option>
            <option value="CLEAR">CLEAR</option>
            <option value="AFFILIATE">AFFILIATE</option>
            <option value="DOUBTFUL">DOUBTFUL</option>
          </select>
        </div>

        {/* --- TAMBAHAN INPUT BARU DARI KAMU --- */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input 
              type="text" 
              placeholder="e.g. Indonesia, USA"
              className="w-full border p-2 rounded mt-1" 
              value={form.country} 
              onChange={(e) => setForm({ ...form, country: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input 
              type="text" 
              placeholder="https://supabase-bucket-url.com/logo.png"
              className="w-full border p-2 rounded mt-1" 
              value={form.logo} 
              onChange={(e) => setForm({ ...form, logo: e.target.value })} 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            placeholder="Tulis deskripsi singkat profil perusahaan di sini..."
            rows={3}
            className="w-full border p-2 rounded mt-1" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
          />
        </div>

        {/* --- BAGIAN DINAMIS: SOURCES --- */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-md">Sources / Referensi</h3>
            <button type="button" onClick={addSource} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">+ Tambah Source</button>
          </div>
          {form.sources.map((source, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 mt-2">
              <input type="text" placeholder="Judul Source" className="border p-2 rounded text-sm" value={source.title} onChange={(e) => handleSourceChange(index, "title", e.target.value)} required />
              <input type="url" placeholder="Link URL" className="border p-2 rounded text-sm" value={source.link} onChange={(e) => handleSourceChange(index, "link", e.target.value)} required />
            </div>
          ))}
        </div>

        {/* --- BAGIAN DINAMIS: BRANDS & PRODUCTS --- */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-md">Brands & Products</h3>
            <button type="button" onClick={addBrand} className="text-xs bg-purple-500 text-white px-2 py-1 rounded">+ Tambah Brand</button>
          </div>
          
          {form.brands.map((brand, brandIndex) => (
            <div key={brandIndex} className="bg-gray-50 p-3 rounded-md mt-3 border">
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-600">Nama Brand #{brandIndex + 1}</label>
                <input type="text" className="w-full border p-2 rounded mt-1 text-sm" value={brand.name} onChange={(e) => handleBrandNameChange(brandIndex, e.target.value)} required />
              </div>

              {/* Sub-Nested: Products */}
              <div className="pl-4 border-l-2 border-purple-300 mt-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-500">Daftar Produk</span>
                  <button type="button" onClick={() => addProductToBrand(brandIndex)} className="text-[10px] bg-gray-600 text-white px-2 py-0.5 rounded">+ Tambah Produk</button>
                </div>
                {brand.products.map((product, productIndex) => (
                  <input key={productIndex} type="text" placeholder="Nama Produk" className="w-full border p-1.5 rounded text-xs" value={product.name} onChange={(e) => handleProductChange(brandIndex, productIndex, e.target.value)} required />
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 disabled:bg-gray-400 mt-4">
          {isSubmitting ? "Sedang Memproses Transaksi Database..." : "Kirim Data Transaksi"}
        </button>
      </form>
    </div>
  );
}