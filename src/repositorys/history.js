import prisma from "../lib/config/connect.js";

export async function listHistory(userId) {
    return await prisma.transactions.findMany({
        where: {userId: userId},
        include: {
            statusTransaction: true,
        }
    })
}

export async function detailHistory(id) {
    return await prisma.transactions.findUnique({
        where: {id : Number(id)},
        include: {
            delivery: true,
            paymentMethod : true,
            statusTransaction: true,
            transactionItem: true,
            user: true
        }
    })
}