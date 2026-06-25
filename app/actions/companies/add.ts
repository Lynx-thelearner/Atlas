"use server";

import { createCompany } from "@/lib/companies/companies";
import { revalidatePath } from "next/cache";

interface CreateCompanyInput {
  name: string;
  ticker?: string;
  country?: string;
  logo?: string;
  description?: string;
  status: "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN";
  sources: { title: string; link: string }[];
  brands: {
    name: string;
    products: { name: string }[];
  }[];
}

export async function createCompanyAction(formData: CreateCompanyInput) {
  try {
    if (!formData.name) {
      return { success: false, message: "Name must be filled." }
    }

    const newCompany = await createCompany(formData);

    revalidatePath("/admin/companies")

    return { success: true, message: "Success creating new data", data: newCompany };
  } catch(error: any) {
    console.error("Action error on createCompanyAction", error)

    if (error.code === "P2002") {
      return {success: false, message: "Company name or ticker already registered"}
    }
    return {success: false, message: "Internal server error"}
  }
}