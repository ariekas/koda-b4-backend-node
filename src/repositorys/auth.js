import prisma from "../lib/config/connect.js";
import bcrypt from "bcrypt";

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
      },
    });
  }