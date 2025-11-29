import prisma from "../lib/config/connect.js";

export async function listHistory(userId) {
    return await prisma.transactions.findMany({
        where: {userId: userId},
        include: {
            statusTransaction: true,
        }
    })
}
