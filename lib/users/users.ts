import prisma from "@/lib/prisma";
import { Prisma } from "../../app/generated/prisma/client";
import { compare, hash } from "bcrypt-ts";

export async function getAllUsers() {
  try {
    return await prisma.user.findMany({
      select: { id: true, username: true }
    });
  } catch (error) {
    console.error("Failed to fetch users data:", error)
    return [];
  }
} 

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true }
    });
  } catch (error) {
    console.error(`Failed to fetch user by id ${id}, error:`, error)
    return null;
  }
}

export async function createUser(data: {
  username: string;
  password: string;
}) {
  try {

    const hashPassword = await hash(data.password, 10);
    
    return await prisma.user.create({
      data: {
        username: data.username,
        password: hashPassword
      }
    });
  } catch (error) {
    console.error("Failed to create user, error:", error)
    return null
  }
}

export async function loginUser(data: {
  username: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: data.username }
    });
    if (!user) {
      return { success: false, message: "Invalid Username or Password."}
    }

    const passwordMatch = await compare(data.password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Invalid Username or Password."}
    }

    return {
      success: true,
      message: "Login Success",
      user: {
        id: user.id,
        username: user.username
      }
    };
    
  } catch (error) {
    console.error("Failed to login user, error:", error);
    return { success: false, message: "Internal server error." }
  }
}

export async function updateUser(id: string, data: {
  username: string;
  password?: string;
}) {
  try {
    const updateData: Prisma.UserUpdateInput = {
      username: data.username,
    };

    if (data.password) {
      updateData.password = await hash(data.password, 10);
    }

    return await prisma.user.update({
      where: { id },
      data: updateData
    })
  } catch (error) {
    console.error(`Failed to update user, id: ${id} with error:`, error)
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    });

    return { success: true, message: "User has been deleted successfully." };
  } catch (error) {
    console.error(`Failed to delete user with id ${id}, error:`, error);
    return { success: false, error: "Failed to delete user."}
  }
}