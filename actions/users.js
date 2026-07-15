"use server";

import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

export const getUser =async() => {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }
  

    const user = await prisma.user.findUnique({
      where: { id:session.user.id },
      
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    // Optionally log error here
    throw new Error(error.message || "Failed to fetch user");
  }
};

