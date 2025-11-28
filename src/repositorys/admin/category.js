import prisma from "../../lib/config/connect.js";

export async function create(data) {
  return await prisma.category.create({
    data: { ...data },
  });
}

export async function list() {
  return await prisma.category.findMany();
}

export async function detail(id) {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
}

export async function edit(id, data) {
  const category = await detail(id);

  if (!category) {
    throw new Error("category tidak ditemukan");
  }

  return await prisma.category.update({
    where: { id: Number(id) },
    data: { ...data },
  });
}

export async function deleted(id) {
    const category = await detail(id);

  if (!category) {
    throw new Error("category tidak ditemukan");
  }

  return await prisma.category.delete({
    where : {id : Number(id)}
  })
}