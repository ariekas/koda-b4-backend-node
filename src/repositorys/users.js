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
  const { fullname, email, password, phone, address } = data;
  const hash = await bcrypt.hash(password, 10);

  const userData = {};
  if (fullname) userData.fullname = fullname;
  if (email) userData.email = email;
  if (password) userData.password = hash;

  const profileData = {};
  if (phone) profileData.phone = phone;
  if (address) profileData.address = address;
  if (imagePath) profileData.pic = imagePath;

  return await prisma.user.update({
    where: { id: Number(id) },
    data: {
      ...(Object.keys(userData).length > 0 && userData),
      ...(Object.keys(profileData).length > 0 && {
        profile: {
          update: profileData,
        },
      }),
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