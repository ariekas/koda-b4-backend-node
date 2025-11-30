import pagination from "../../lib/config/pagination.js";
import { addCartItems, deleteCartItem, listCart } from "../../repositorys/cart.js";

/**
 * POST /user/cart
 * @summary Add item to cart
 * @tags User Cart
 * @security BearerAuth
 * @param {object} request.body.required - Cart item data
 * @param {number} request.body.productId.required - Product ID
 * @param {number} request.body.quantity.required - Quantity of product
 * @param {number} request.body.sizeId - Size ID (optional)
 * @param {number} request.body.variantId - Variant ID (optional)
 * @return {object} 201 - Success response
 * @return {object} 500 - Error response
 * @example request - Example payload
 * {
 *   "productId": 1,
 *   "quantity": 2,
 *   "sizeId": 1,
 *   "variantId": 1
 * }
 * @example response - 201 - Success response example
 * {
 *   "success": true,
 *   "message": "Item added to cart",
 *   "data": {
 *     "id": 1,
 *     "quantity": 2,
 *     "productId": 1,
 *     "sizeId": 1,
 *     "variantId": 1,
 *     "cartId": 1,
 *     "created_at": "2024-01-01T00:00:00.000Z",
 *     "updated_at": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function createCart(req, res) {
  try {
    const userId = req.jwtPayload.id;

    const result = await addCartItems(userId, req.body, req.body.quantity);

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: result,
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
 * GET /user/carts
 * @summary Get list of cart items with pagination
 * @tags User Cart
 * @security BearerAuth
 * @param {number} page.query - Page number (default: 1)
 * @param {number} limit.query - Number of items per page (default: 10)
 * @return {object} 200 - Success response
 * @return {object} 404 - Cart not found
 * @return {object} 500 - Error response
 * @example response - 200 - Success response example
 * {
 *   "success": true,
 *   "message": "Success getting list cart",
 *   "page": 1,
 *   "limit": 10,
 *   "totalItems": 5,
 *   "next": "/user/carts?page=2&limit=10",
 *   "prev": null,
 *   "data": [
 *     {
 *       "id": 1,
 *       "quantity": 2,
 *       "productId": 1,
 *       "sizeId": 1,
 *       "variantId": 1,
 *       "cartId": 1,
 *       "created_at": "2024-01-01T00:00:00.000Z",
 *       "updated_at": "2024-01-01T00:00:00.000Z"
 *     }
 *   ]
 * }
 * @example response - 404 - Cart not found
 * {
 *   "success": false,
 *   "message": "cart not found"
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function getListCart(req, res) {
  try {
    const userId = req.jwtPayload.id;

    let {page =1, limit =10} = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    const {data, totalItems} = await listCart(userId, page, limit)

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "cart not found"
      });
    }
    const hateoas = pagination("/user/carts", page, limit, totalItems)

    res.status(200).json({
      success: true,
      message: "Success getting list cart",
      ...hateoas,
      data
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
 * DELETE /user/cart/{id}
 * @summary Delete cart item
 * @tags User Cart
 * @security BearerAuth
 * @param {number} id.path.required - Cart item ID
 * @return {object} 201 - Success response
 * @return {object} 500 - Error response
 * @example response - 201 - Success response example
 * {
 *   "success": true,
 *   "message": "success delete cart item"
 * }
 * @example response - 500 - Error response example
 * {
 *   "success": false,
 *   "message": "Error Server",
 *   "error": "Error message details"
 * }
 */
export async function deletedCartItem(req, res) {
  try {
     await deleteCartItem(req.params.id)

    return res.status(201).json({
      success: true,
      message: "success delete cart item",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}