import prisma from "../lib/config/connect.js";

export async function listCart(userId, page, limit) {
  const skip = (page -1) * limit

  const [data, totalItems] = await Promise.all([
    prisma.cart.findMany({
      where: {userId},
      skip,
      take: limit,
      include: {
        items: {}
      }
    }),
    prisma.cartItem.count()
  ])
  return {data, totalItems}
}

export async function addCartItems(userId, data, quantity) {
    const { productId, sizeId, variantId } = data; 
  
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error("Product not found");
    }
  
    const size = await prisma.size.findUnique({ where: { id: sizeId } });
    if (!size) {
      throw new Error("Size not found");
    }
  
    const variant = await prisma.variant.findUnique({ where: { id: variantId } });
    if (!variant) {
      throw new Error("Variant not found");
    }

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