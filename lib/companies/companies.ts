import prisma from "@/lib/prisma";
import { Prisma } from "../../app/generated/prisma/client";

export async function getAllCompanies() {
  try {
    return await prisma.company.findMany({
      include: {
        sources: true,
        
      },
      orderBy: {
        name: "asc",
      },
    });
  } catch (error) {
    console.error("Failed to fetch companies data:", error);
    return [];
  }
}

export async function getCompaniesByStatus(
  status: "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN",
) {
  try {
    return await prisma.company.findMany({
      where: { status },
    });
  } catch (error) {
    console.error(`Failed to fetch companies by status ${status}:`, error);
    return [];
  }
}

export async function getCompanyById(
  id: string
) {
  try {
    return await prisma.company.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(`Failed to fetch company by id ${id}:`, error);
    return null;
  }
}

export async function createCompany(data: {
  name: string;
  ticker?: string;
  country?: string;
  logo?: string;
  description?: string;
  status: "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN";
  sources: { title: string; link: string; }[];
  brands: {
    name: string;
    products:
    { name: string; }[];
  }[];
}) {
  try {
    return await prisma.company.create({
      data: {
        name: data.name,
        ticker: data.ticker,
        country: data.country,
        logo: data.logo,
        description: data.description,
        status: data.status,
        sources: {
          create: data.sources,
        },
        brands: {
          create: data.brands.map((brand) => ({
            name: brand.name,
            products: {
              create: brand.products,
            }
          }))
        }
      },
    });
  } catch (error) {
    console.error("Failed to create company:", error);
    return null
  }
}

export async function updateCompany(
  id: string,
  data: {
    name: string;
    ticker?: string;
    country?: string;
    logo?: string;
    description?: string;
    status: "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN";
    sources?: { title: string; link: string }[];
    brands?: {
      name: string;
      products: { name: string }[];
    }[];
  }
) {
  try {
    const updateData: Prisma.CompanyUpdateInput = {
      name: data.name,
      ticker: data.ticker,
      country: data.country,
      logo: data.logo,
      description: data.description,
      status: data.status,
    };

    if (data.sources) {
      updateData.sources = {
        deleteMany: {},
        create: data.sources,
      };
    }

    if (data.brands) {
      updateData.brands = {
        deleteMany: {},
        // Perbaikan mapping nested create untuk Product
        create: data.brands.map((brand) => ({
          name: brand.name,
          products: {
            create: brand.products, 
          },
        })),
      };
    }

    // 3. Eksekusi query (Perbaikan salah ketik dari 'compay' ke 'company')
    return await prisma.company.update({
      where: { id },
      data: updateData,
    });
    
  } catch (error) {
    console.error(`Failed to update company id: ${id} with error:`, error);
    return null;
  }
}

export async function deleteCompany(id: string) {
  try {
    await prisma.company.delete({
      where: { id },
    });
  
    return { success: true, message: "Company and all its related data deleted successfully." };
  } catch (error) {
    console.error(`Failed to delete company with id ${id}:`, error);
    return { success: false, error: "Failed to delete company." };
  }
}