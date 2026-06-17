type CompanyCardProps = {
  name: string;
  status: boolean;
  description: string;
  logo: string;
};

export default function CompanyCard({
  name,
  status,
  description,
  logo,
}: CompanyCardProps) {
  return (
    <div className="rounded-xl border p-4 shadow-sm hover:bg-slate-700">
      <img
        src={logo}
        alt={name}
        className="h-20 w-20 rounded-full object-cover"
      />

      <h2 className="mt-2 text-xl font-bold">
        {name}
      </h2>

      <span
        className={`inline-block rounded px-2 py-1 text-sm ${
          status
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        }`}
      >
        {status ? "AFFILIATE" : "CLEAR"}
      </span>

      <p className="mt-2 text-slate-100">
        {description}
      </p>
    </div>
  );
}