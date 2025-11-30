import pagination from "../../lib/config/pagination.js";
import { invalidateCache } from "../../lib/middelware/invalidatecache.js";
import { listTransaction, updateStatus } from "../../repositorys/transaction.js";

const pathRedis = "cache:/admin/transaction*"
/**
 * @typedef {object} StatusTransaction
 * @property {number} id
 * @property {string} status
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {object} TransactionItem
 * @property {number} id
 * @property {number} quantity
 * @property {number} subtotal
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} transactionId
 * @property {number} productId
 * @property {number} sizeId
 * @property {number} variantId
 * @property {object} product - Product details (nullable)
 */

/**
 * @typedef {object} Transaction
 * @property {number} id
 * @property {string} name_user
 * @property {string} address_user
 * @property {string} phone_address
 * @property {string} email_address
 * @property {number} total
 * @property {string} invoice_num
 * @property {string} created_at
 * @property {string} updated_at
 * @property {number} userId
 * @property {number} statusTransactionId
 * @property {number} paymentMethodId
 * @property {number} deliveryId
 * @property {StatusTransaction} statusTransaction - Status details
 * @property {array<TransactionItem>} transactionItem - Array of transaction items
 */

/**
 * @typedef {object} PaginationLinks
 * @property {string} self - Current page URL
 * @property {string} next - Next page URL (nullable)
 * @property {string} prev - Previous page URL (nullable)
 */

/**
 * @typedef {object} TransactionListResponse
 * @property {boolean} success
 * @property {string} message
 * @property {number} page
 * @property {number} limit
 * @property {number} totalPages
 * @property {PaginationLinks} _links
 * @property {array<Transaction>} data - Array of transaction objects
 */

/**
 * @typedef {object} ErrorResponse
 * @property {boolean} success
 * @property {string} message
 * @property {string} error - Error details (optional)
 */

/**
 * GET /admin/transactions
 * @summary Get list of transactions with pagination
 * @tags Admin Transaction
 * @security BearerAuth
 * @param {number} page.query - Page number - default: 1
 * @param {number} limit.query - Items per page - default: 10
 * @return {TransactionListResponse} 200 - Success response
 * @return {ErrorResponse} 404 - Transaction not found
 * @return {ErrorResponse} 500 - Server error
 */
export async function getListTransactions(req, res) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const { data, totalItems } = await listTransaction(page, limit);
    console.log("DATA",data)
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

/**
 * @typedef {object} UpdateStatus
 * @property {number} statusTransactionId - Status transaction ID (1: pending, 2: onProgress, 3: complete, 4: cancel)
 */
/**
 * PATCH /admin/transaction/status/{id}
 * @summary Update status of a transaction
 * @tags Admin Transaction
 * @security BearerAuth
 * @param {number} id.path.required - Transaction ID
 * @param {UpdateStatus} request.body.required - Request body
 * @return {object} 200 - Success response
 * @return {boolean} 200.success - Indicates request was successful
 * @return {string} 200.message - Success message
 * @example 200 - example-success
 * {
 *   "success": true,
 *   "message": "Success update status transaction"
 * }
 * @return {object} 500 - Server error
 * @return {boolean} 500.success - Indicates request failed
 * @return {string} 500.message - Error message
 * @return {string} 500.error - Detailed error
 * @example 500 - example-error
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Transaction ID not found"
 * }
 */
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