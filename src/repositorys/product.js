import prisma from "../lib/config/connect.js";
import { detail } from "./category.js";

export async function create(data) {

  const category = await detail(data.categoryId)

  if (!category) {
    throw new Error("Category not found");
  }
  return await prisma.product.create({
    data: { ...data },
  });
}

export async function list() {
  return await prisma.product.findMany();
}

export async function detailProduct(id) {
  return await prisma.product.findUnique({
    where: { id: Number(id) },
  });
}

export async function edit(id, data) {
  const product = await detailProduct(id);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return await prisma.product.update({
    where: { id: Number(id) },
    data: { ...data },
  });

}

export async function deleted(id) {
    const product = await detailProduct(id);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return await prisma.product.delete({
    where : {id : Number(id)}
  })
}

export async function uploadImage(id, imagePath) {
  const product = await detailProduct(id);

  if (!product) {
    throw new Error("Product tidak ditemukan");
  }

  return await prisma.product.update({
    where: {id : Number(id)},
    data :{
      images: {
        create: {
          image: imagePath
        }
      }
    }
  })

}