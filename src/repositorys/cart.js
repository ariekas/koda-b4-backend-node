import prisma from "../lib/config/connect.js";

export async function addCartItems(userId, data, quantity) {
    const { productId, sizeId, variantId } = data; 
  
    let cart = await prisma.cart.findFirst({ where: { userId } });
  
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }
  
    const extItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        sizeId,
        variantId,
      },
    });
  
    if (extItem) {
      return await prisma.cartItem.update({
        where: { id: extItem.id },
        data: {
          quantity: extItem.quantity + quantity,
        },
      });
    }
  
    return await prisma.cartItem.create({
      data: {
        productId,
        sizeId,
        variantId,
        quantity,
        cartId: cart.id,
      },
    });
  }

export async function  deleteCartItem(id) {
  return await prisma.cartItem.delete({
    where: {id : Number(id)}
  })
}