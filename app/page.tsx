import CompanyCard from "@/components/company-card";

interface CompanyType {
  id: string;
  logo: string;
  name: string;
  status: boolean;
  description: string;
}

export default async function Page() {
  const query = await fetch(
    `https://6a2fa4bea7f8866418d4b502.mockapi.io/companies`,
  );
  const companies = await query.json();
  console.log("list of companies:", companies);

  return (
    <div className="grid justify-between grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
      {companies.map((company: CompanyType) => (
        <CompanyCard
          key={company.id}
          logo={company.logo}
          name={company.name}
          status={company.status}
          description={company.description}
        />
      ))}     
    </div>

    
    
  );

  
}
