"use server";

import { getAllCompanies, getCompaniesByStatus, getCompanyById } from "@/lib/companies/companies";

export async function getAllCompaniesAction() {
  try {
    const companies = await getAllCompanies();
    return { success: true, data: companies };
  } catch (error) {
    console.error("Action error", error);
    return { success: false, message: "Internal server error", data: [] };
  }
}

export async function getCompaniesByStatusAction(status: "AFFILIATE" | "CLEAR" | "DOUBTFUL" | "UNKNOWN") {
  try {
    const companies = await getCompaniesByStatus(status);
    return { success: true, data: companies };
  } catch (error) {
    console.error(`Action error getCompaniesByStatusAction (${status}):`, error);
    return { sucess: false, message: "Internal server error.", data: [] };
  }
}

export async function getCompanyByIdAction(id: string) {
  try {
    if (!id) return { success: false, message: "Company ID is required.", data: null };
    
    const company = await getCompanyById(id);
    if (!company) return { success: false, message: "Company not found.", data: null };

    return { success: true, data: company };
  } catch (error) {
    console.error(`Action error on getCompanyByIdAction (${id}):`, error);
    return { success: false, message: "Internal server error.", data: null };
  }
}