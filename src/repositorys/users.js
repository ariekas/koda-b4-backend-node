import prisma from "../lib/config/connect.js";
import bcrypt from "bcrypt";

export async function list(page, limit) {
  const skip = (page -1) * limit

  const [data, totalItems] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit
    }),
    prisma.user.count()
  ])
  return {data, totalItems};
}

export async function detail(id) {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      profile: {},
    },
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
        create: {},
      },
    },
  });
}

export async function updateProfile(data, id, imagePath) {
  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      ...(data.user || {}), 

      ...(data.profile || imagePath
        ? {
            profile: {
              update: {
                ...(data.profile || {}),
                ...(imagePath && { pic: imagePath }), 
              },
            },
          }
        : {}),
    },
  });
}

export async function saveOtp(email, otp) {
  const exprt = new Date(Date.now() + 10 * 60 * 1000)

  return await prisma.user.update({
    where: {email},
    data: {
      codeOtp: otp,
      otpExpires:exprt
    }
  })
}

export async function resetPassword(email, newPassword) {
  const hash = await bcrypt.hash(newPassword, 10)
  return await prisma.user.update({
    where: {email},
    data: {
      password: hash,
      codeOtp: null,
      otpExpires: null
    }
  })
}