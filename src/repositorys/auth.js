import prisma from "../lib/config/connect.js";
import bcrypt from "bcrypt";

export async function findUser(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function create(fullname, email, password) {
    const hash = await bcrypt.hash(password, 10)
    return await prisma.user.create({
        data :{
            fullname,
            email,
            password : hash
        }
    })
}