import prisma from "../../lib/config/connect.js";

export async function create(data) {
  return await prisma.product.create({
    data: { ...data },
  });
}

export async function list() {
  return await prisma.product.findMany();
}

export async function detail(id) {
  return await prisma.product.findUnique({
    where: { id: Number(id) },
  });
}

export async function edit(id, data) {
  const product = await detail(id);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return await prisma.product.update({
    where: { id: Number(id) },
    data: { ...data },
  });

}

export async function deleted(id) {
    const product = await detail(id);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return await prisma.product.delete({
    where : {id : Number(id)}
  })
}