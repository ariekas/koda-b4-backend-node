import prisma from "../../lib/config/connect.js";
import bcrypt from "bcrypt";

export async function list() {
  return await prisma.user.findMany();
}

export async function detail(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include :{
      profile:{}
    }
  });
}

export async function updateRole(data, id) {
  const user = detail(id);
  if (!user) {
    throw new Error("user tidak ditemukan");
  }
  return await prisma.user.update({
    where: { id: Number(id) },
    data: data,
  });
}


export async function findUser(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function create(data) {
    const hash = await bcrypt.hash(data.password, 10);
  
    return await prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password: hash,
        profile: {
          create : {}
        }
      },
    });
  }