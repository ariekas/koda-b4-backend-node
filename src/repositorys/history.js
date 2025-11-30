import prisma from "../lib/config/connect.js";

export async function listHistory(userId) {
    return await prisma.transactions.findMany({
        where: {userId: userId},
        include: {
            statusTransaction: {},
        }
    })
}

export async function detailHistory(id) {
    const transaction = await prisma.transactions.findUnique({
        where: {id: Number(id)}
    })

    if (!transaction){
        throw new Error("History not found");
    }
    return await prisma.transactions.findUnique({
        where: {id : Number(id)},
        include: {
            delivery: {},
            paymentMethod : {},
            statusTransaction: {},
            transactionItem: {
                include: {
                    product: {
                        include: {
                            images: {
                                take: 1
                            }
                        }
                    }
                }
            },
            user: {}
        }
    })
}