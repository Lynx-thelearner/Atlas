"use server";

import { loginUser } from "@/lib/users/users";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, message: "Username and password required." };
  }

  const result = await loginUser({ username, password });

  if (!result.success || !result.user) {
    return { success: false, message: result.message };
  }

  const cookieStore = await cookies();
  cookieStore.set("session_token", result.user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return { success: true, message: "Redirecting..." };
}
