import { productFavourite, filter } from "../../repositorys/product.js";

/**
 * GET /user/product/favorite
 * @summary Get favourite products
 * @tags User Product
 * @security BearerAuth
 * @return {object} 201 - Success response
 * @return {object} 500 - Error response
 * @example response - 201 - Success response example
 * {
 *   "success": true,
 *   "message": "success get favourite product",
 *   "data": [
 *     {
 *       "id": 1,
 *       "name": "Product 1",
 *       "price": 100.0,
 *       "price_discount": 10.0,
 *       "description": "Description",
 *       "stock": 50,
 *       "isFlashsale": false,
 *       "isFavorite": true,
 *       "created_at": "2025-12-01T00:00:00.000Z",
 *       "updated_at": "2025-12-01T00:00:00.000Z",
 *       "categoryId": 1,
 *       "images": [{"id": 1, "image": "image.jpg"}],
 *       "sizes": [{"id": 1, "name": "M", "costs": 0}],
 *       "variants": [{"id": 1, "name": "Red", "costs": 0}],
 *       "tax": {"id": 1, "name": "VAT", "tax": 10},
 *       "rating": [{"id": 1, "review": "Good", "rating": 5}]
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
export async function getFavourite(req, res) {
  try {
    const product = await productFavourite();

    res.status(201).json({
      success: true,
      message: "success get favourite product",
      data : product
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
 * GET /user/product/filter
 * @summary Filter products by query parameters
 * @tags User Product
 * @security BearerAuth
 * @param {string} search.query - Search keyword (optional)
 * @param {number} category.query - Category IDs comma separated, e.g. "1,2" (optional)
 * @param {number} discount.query - Discount values comma separated, e.g. "5,10" (optional)
 * @param {number} minPrice.query - Minimum price (optional)
 * @param {number} maxPrice.query - Maximum price (optional)
 * @param {string} sortPrice.query - Sort by price (optional) - enum: ["asc","desc"]
 * @return {object} 200 - Success response
 * @return {object} 500 - Error response
 * @example response - 200 - Success response example
 * {
 *   "success": true,
 *   "message": "Filtered product list",
 *   "data": [
 *     {
 *       "id": 1,
 *       "name": "Product 1",
 *       "price": 100.0,
 *       "price_discount": 10.0,
 *       "description": "Description",
 *       "stock": 50,
 *       "isFlashsale": false,
 *       "isFavorite": true,
 *       "created_at": "2025-12-01T00:00:00.000Z",
 *       "updated_at": "2025-12-01T00:00:00.000Z",
 *       "categoryId": 1,
 *       "images": [{"id": 1, "image": "image.jpg"}],
 *       "sizes": [{"id": 1, "name": "M", "costs": 0}],
 *       "variants": [{"id": 1, "name": "Red", "costs": 0}],
 *       "tax": {"id": 1, "name": "VAT", "tax": 10},
 *       "rating": [{"id": 1, "review": "Good", "rating": 5}]
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
export async function filterProducts(req, res) {
  try {
    const {
      search,
      category,
      discount,
      minPrice,
      maxPrice,
      sortPrice
    } = req.query;

    const filteredProduct = await filter({
      search,
      category,
      discount,
      minPrice,
      maxPrice,
      sortPrice
    });

    res.status(200).json({
      success: true,
      message: "Filtered product list",
      data: filteredProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}
