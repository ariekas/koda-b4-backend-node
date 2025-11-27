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

  const update = await prisma.product.update({
    where: { id: Number(id) },
    data: { ...data },
  });

  return update;
}
