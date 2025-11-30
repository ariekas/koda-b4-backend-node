import pagination from "../../lib/config/pagination.js";
import { invalidateCache } from "../../lib/middelware/invalidatecache.js";
import { listTransaction, updateStatus } from "../../repositorys/transaction.js";

const pathRedis = "cache:/admin/transaction*"
export async function getListTransactions(req, res) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const { data, totalItems } = await listTransaction(page, limit);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "transaction not found",
      });
    }

    const hateoas = pagination("/admin/transactions", page, limit, totalItems);

    res.status(200).json({
      success: true,
      message: "Success getting list transaction",
      ...hateoas,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}

export async function updateStatusTransaction(req, res) {
    try {
        const transaction = await updateStatus(req.params.id, req.body.statusTransactionId)

        await invalidateCache(pathRedis)
        
        res.status(200).json({
            success: true,
            message: "Success update status transaction",
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });  
    }
}