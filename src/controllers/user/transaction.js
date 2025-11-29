import { createTransaction } from "../../repositorys/transaction.js";

export async function addTransaction(req, res) {
  try {
    console.log(req.jwtPaload.id)
    const userId = req.jwtPaload.id; 

    const transaction = await createTransaction(userId, req.body);

    console.log(transaction)

    return res.status(201).json({
      success: true,
      message: "success created transaction",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}
