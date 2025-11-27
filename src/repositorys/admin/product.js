import prisma from "../../lib/config/connect.js";

export async function create(data) {
    return await prisma.product.create({
      data: { ...data }, 
    });
  }
  
export async function list() {
    return await prisma.product.findMany()
}

export async function detail(id) {
    return await prisma.product.findUnique({
        where: {id : Number(id)},
    })
}