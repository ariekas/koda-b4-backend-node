import prisma from "../../lib/config/connect.js";

export async function create(data) {
    return await prisma.product.create({
      data: { ...data }, 
    });
  }
  