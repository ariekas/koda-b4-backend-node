import prisma from "../lib/config/connect.js";

export async function createTransaction(userId, data) {
    // get user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
  
    if (!user) throw new Error("User not found");
  
    // get all cart include product, size, variant
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true, size: true, variant: true } } },
    });
  
    if (!cart || cart.items.length === 0) throw new Error("Cart is empty");
  
    // calculation subtotal
    const transactionItems = cart.items.map((item) => ({
      productId: item.productId,
      sizeId: item.sizeId,
      variantId: item.variantId,
      quantity: item.quantity,
      subtotal:
        ((item.product.price_discount || item.product.price) +
          (item.size?.costs || 0) +
          (item.variant?.costs || 0)) *
        item.quantity,
    }));
  
    const total = transactionItems.reduce((acc, item) => acc + item.subtotal, 0);
  
    // generate invoice number
    const invoiceNum = `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${userId}`;
  
    // create transaction
    const transaction = await prisma.transactions.create({
      data: {
        name_user: data.name_user || user.fullname,
        address_user: data.address_user || user.profile?.address || "",
        phone_address: data.phone_address || user.profile?.phone || "",
        email_address: data.email_address || user.email,
        total,
        invoice_num: invoiceNum,
        userId: userId,
        paymentMethodId: data.payment_methods || null,
        deliveryId: data.deliveryId || null,
        transactionItem: { create: transactionItems },
      },
      include: { 
        transactionItem: true, 
        paymentMethod: true, 
        delivery: true,
        statusTransaction: true 
      },
    });
  
    // delete cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  
    return transaction;
  }

  export async function listTransaction(page, limit) {
    const skip = (page - 1) * limit

    const [data, totalItems] = await Promise.all([
    prisma.transactions.findMany({
      skip,
      take: limit,
      include: {
        statusTransaction: {},
        transactionItem: {
          include: {
            product: {}
          }
        }
      }
    }),
    prisma.transactions.count()
    ])

    return( data, totalItems)
  }

  export async function updateStatus(id, statusTransactionId) {
    return await prisma.transactions.update({
      where: {id : Number(id)},
      data: {
        statusTransactionId: Number(statusTransactionId)
      }
    })
  }