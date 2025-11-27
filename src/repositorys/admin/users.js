import prisma from "../../lib/config/connect.js";

export async function list() {
  return await prisma.user.findMany();
}

export async function detail(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
  });
}

export async function updateRole(data, id) {
  const user = detail(id);
  if (!product) {
    throw new Error("user tidak ditemukan");
  }
  return await prisma.user.update({
    where: { id: Number(id) },
    data: data.role,
  });
}

