import Link from "next/link"

export default function DashboardAdmin() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <header className="w-full flex justify-between bg-cyan-200 px-4 py-4 rounded-sm shadow-sm">
        <span className="text-slate-800 text-xl font-bold">Atlas Admin Panel</span>
        <nav className="items-end-safe flex justify-between gap-4 text-slate-800">
          <Link href="/" className="hover:text-slate-200  transition-colors duration-200">Home</Link>
        </nav>
      </header>
      
      <main className="flex-1 flex items-center justify-center gap-4 px-4 py-4 text-slate-800">
      
        <Link href="" className="
          bg-gray-100 rounded-xl cursor-pointer transition-all duration-150 shadow-sm w-60 py-5
          text-center border border-transparent hover:shadow-md hover:border-indigo-300 hover:border-4 active:scale-[0.98]">
          <h1 className="text-xl font-bold">User</h1>
          <p>Manage User</p>
        </Link>
      
        <Link href="" className="
          bg-gray-100 rounded-xl cursor-pointer transition-all duration-150 shadow-sm w-60 py-5
          text-center border border-transparent hover:shadow-md hover:border-indigo-300 hover:border-4 active:scale-[0.98]">
          <h1 className="text-xl font-bold">Companies</h1>
          <p>Manage Companies</p>
        </Link>
      
        <Link href="" className="
          bg-gray-100 rounded-xl cursor-pointer transition-all duration-150 shadow-sm w-60 py-5
          text-center border border-transparent hover:shadow-md hover:border-indigo-300 hover:border-4 active:scale-[0.98]">
          <h1 className="text-xl font-bold">Brand</h1>
          <p>Manage Brand</p>
        </Link>
      
      </main>
      
    </div>
  )
}
