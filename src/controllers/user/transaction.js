import { createTransaction } from "../../repositorys/transaction.js";

/**
 * @typedef TransactionItemInput
 * @property {number} productId.required - ID produk
 * @property {number} quantity.required - Jumlah produk
 * @property {number} sizeId - ID size (opsional)
 * @property {number} variantId - ID variant (opsional)
 */

/**
 * @typedef CreateTransactionRequest
 * @property {string} name_user.required - Nama user
 * @property {string} address_user.required - Alamat user
 * @property {string} phone_address.required - Nomor telepon user
 * @property {string} email_address.required - Email user
 * @property {number} total.required - Total harga
 * @property {number} paymentMethodId - ID metode pembayaran
 * @property {number} deliveryId - ID pengiriman
 * @property {TransactionItemInput[]} items.required - Daftar item transaksi
 */

/**
 * @typedef TransactionItemResponse
 * @property {number} id - ID item transaksi
 * @property {number} productId - ID produk
 * @property {number} quantity - Jumlah produk
 * @property {number} sizeId - ID size
 * @property {number} variantId - ID variant
 * @property {number} subtotal - Subtotal item
 * @property {string} created_at - Tanggal dibuat
 * @property {string} updated_at - Tanggal update
 */

/**
 * @typedef TransactionResponse
 * @property {number} id - ID transaksi
 * @property {string} name_user - Nama user
 * @property {string} address_user - Alamat user
 * @property {string} phone_address - Nomor telepon
 * @property {string} email_address - Email user
 * @property {number} total - Total harga
 * @property {string} invoice_num - Nomor invoice
 * @property {number} statusTransactionId - Status transaksi
 * @property {number} paymentMethodId - Metode pembayaran
 * @property {number} deliveryId - ID pengiriman
 * @property {TransactionItemResponse[]} transactionItem - Daftar item
 * @property {string} created_at - Tanggal dibuat
 * @property {string} updated_at - Tanggal update
 */

/**
 * @typedef CreateTransactionRequest
 * @property {string} name_user.required - Nama user
 * @property {string} address_user.required - Alamat user
 * @property {string} phone_address.required - Nomor telepon user
 * @property {string} email_address.required - Email user
 * @property {number} total.required - Total harga transaksi
 * @property {number} paymentMethodId - ID metode pembayaran (opsional)
 * @property {number} deliveryId - ID pengiriman (opsional)
 */

/**
 * @typedef TransactionResponse
 * @property {number} id - ID transaksi
 * @property {string} name_user - Nama user
 * @property {string} address_user - Alamat user
 * @property {string} phone_address - Nomor telepon
 * @property {string} email_address - Email user
 * @property {number} total - Total harga
 * @property {string} invoice_num - Nomor invoice
 * @property {number} statusTransactionId - Status transaksi
 * @property {number} paymentMethodId - Metode pembayaran
 * @property {number} deliveryId - ID pengiriman
 * @property {string} created_at - Tanggal dibuat
 * @property {string} updated_at - Tanggal update
 */

/**
 * POST /user/transaction
 * @summary Create a new transaction
 * @tags User Transaction
 * @security BearerAuth
 * @param {CreateTransactionRequest} request.body.required - Data transaksi
 * @return {object} 201 - Success response
 * @return {TransactionResponse} 201.response - Contoh response sukses
 * @return {object} 500 - Error response
 * @example request - Example payload
 * {
 *   "name_user": "John Doe",
 *   "address_user": "Jl. Contoh No.1",
 *   "phone_address": "08123456789",
 *   "email_address": "john@example.com",
 *   "total": 150000,
 *   "paymentMethodId": 1,
 *   "deliveryId": 1
 * }
 * @example response - 201 - Success response example
 * {
 *   "success": true,
 *   "message": "success created transaction",
 *   "data": {
 *     "id": 1,
 *     "name_user": "John Doe",
 *     "address_user": "Jl. Contoh No.1",
 *     "phone_address": "08123456789",
 *     "email_address": "john@example.com",
 *     "total": 150000,
 *     "invoice_num": "INV-20251201-0001",
 *     "statusTransactionId": 1,
 *     "paymentMethodId": 1,
 *     "deliveryId": 1,
 *     "created_at": "2025-12-01T00:00:00.000Z",
 *     "updated_at": "2025-12-01T00:00:00.000Z"
 *   }
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function addTransaction(req, res) {
  try {
    const userId = req.jwtPayload.id; 

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
