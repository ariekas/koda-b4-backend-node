import prisma from "../lib/config/connect.js";
import { detailProduct } from "./product.js";

export async function create(data) {
    
    const product = await detailProduct(data.productId)

    if (!product) throw new Error("Product tidak ditemukan");

  const priceDiscount = product.price - (product.price * data.discount) / 100;

  await prisma.discount.create({
    data: {
      ...data,
      productId: Number(data.productId),
    },
  });

  await prisma.product.update({
    where: { id: Number(data.productId) },
    data: { price_discount: priceDiscount },
  });
}

export async function list() {
  return await prisma.discount.findMany();
}

export async function detailDiscount(id) {
  return await prisma.discount.findUnique({
    where: { id: Number(id) },
  });
}

export async function edit(id, data) {
  const discount = await detailDiscount(id);

  if (!discount) {
    throw new Error("discount tidak ditemukan");
  }

  const product = await detailProduct(data.productId);

  if (!product) throw new Error("Product tidak ditemukan");

  const priceDiscount = product.price - (product.price * data.discount) / 100;

  await prisma.discount.update({
    where: { id: Number(id) },
    data: {
      ...data,
      productId: data.productId ? Number(data.productId) : undefined,
    },
  });

  await prisma.product.update({
    where: { id: Number(data.productId) },
    data: { price_discount: priceDiscount },
  });
}

export async function deleted(id) {
  const discount = await detailDiscount(id);

  if (!discount) {
    throw new Error("discount tidak ditemukan");
  }

  return await prisma.discount.delete({
    where: { id: Number(id) },
  });
}
