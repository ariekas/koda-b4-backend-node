import { detailHistory, listHistory } from "../../repositorys/history.js";

/**
 * GET /user/historys
 * @summary Get list of user history
 * @tags User History
 * @security BearerAuth
 * @return {object} 200 - Success response
 * @return {object} 500 - Error response
 * @example response - 200 - Success response example
 * {
 *   "success": true,
 *   "message": "success get list history",
 *   "data": [
 *     {
 *       "id": 1,
 *       "name_user": "John Doe",
 *       "address_user": "123 Street",
 *       "phone_address": "081234567890",
 *       "email_address": "john@example.com",
 *       "total": 150000,
 *       "invoice_num": "INV-001",
 *       "statusTransactionId": 3,
 *       "paymentMethodId": 1,
 *       "deliveryId": 1,
 *       "created_at": "2025-12-01T00:00:00.000Z",
 *       "updated_at": "2025-12-01T00:00:00.000Z"
 *     }
 *   ]
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function getListHistory(req, res) {
    try {
        const userId = req.jwtPaload.id; 

        const history = await listHistory(userId)

        res.status(200).json({
            success: true,
            message: "success get list history",
            data: history
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
 * GET /user/history/{id}
 * @summary Get detail of a specific history record
 * @tags User History
 * @security BearerAuth
 * @param {number} id.path.required - History ID
 * @return {object} 200 - Success response
 * @return {object} 404 - Not found response
 * @return {object} 500 - Error response
 * @example response - 200 - Success response example
 * {
 *   "success": true,
 *   "message": "success get detail history",
 *   "data": {
 *       "id": 1,
 *       "name_user": "John Doe",
 *       "address_user": "123 Street",
 *       "phone_address": "081234567890",
 *       "email_address": "john@example.com",
 *       "total": 150000,
 *       "invoice_num": "INV-001",
 *       "statusTransactionId": 3,
 *       "paymentMethodId": 1,
 *       "deliveryId": 1,
 *       "transactionItem": [
 *           {
 *               "id": 1,
 *               "quantity": 2,
 *               "subtotal": 50000,
 *               "productId": 1,
 *               "sizeId": 1,
 *               "variantId": 1,
 *               "created_at": "2025-12-01T00:00:00.000Z",
 *               "updated_at": "2025-12-01T00:00:00.000Z"
 *           }
 *       ],
 *       "created_at": "2025-12-01T00:00:00.000Z",
 *       "updated_at": "2025-12-01T00:00:00.000Z"
 *   }
 * }
 * @example response - 404 - Not found example
 * {
 *   "success": false,
 *   "message": "History not found"
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function getDetailHistory(req, res) {
    try {
        const history = await detailHistory(req.params.id)

        res.status(200).json({
            success: true,
            message: "success get detail history",
            data: history
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}