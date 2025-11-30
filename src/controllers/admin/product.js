import { create, deleted, detailProduct, edit, list, uploadImage } from "../../repositorys/product.js";
import { invalidateCache } from "../../lib/middelware/invalidatecache.js";
import  pagination  from "../../lib/config/pagination.js";

const pathRedis = "cache:/admin/product*" 

/**
 * @typedef {object} CreateProductRequest
 * @property {string} name.required - Product name
 * @property {number} price.required - Product price
 * @property {number} stock.required - Product stock
 * @property {string} categoryId.required - Category ID
 * @property {string} description - Product description (optional)
 */
/**
 * POST /admin/product
 * @summary Create a new product
 * @tags Admin Product
 * @param {CreateProductRequest} request.body.required - Product payload
 * @return {object} 201 - Success response
 * @security BearerAuth
 */
export async function createProduct(req, res) {
  try {

    if (req.body.stock < 0) {
      res.status(401).json({
        success: false,
        message: "Stock much be more 0",
      });
      return;
    }

    if (req.body.price < 0) {
      res.status(401).json({
        success: false,
        message: "price much be more 0",
      });
      return;
    }

     await create(req.body);

     await invalidateCache(pathRedis)
    
    res.status(201).json({
      success: true,
      message: "success create product",
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
 * GET /admin/products
 * @summary Get all products with pagination
 * @tags Admin Product
 * @param {number} page.query - Page number (default 1)
 * @param {number} limit.query - Limit per page (default 10)
 * @return {object} 200 - Success response with pagination
 * @return {number} 200.page - Current page
 * @return {number} 200.limit - Limit per page
 * @return {number} 200.totalPages - Total pages
 * @return {array<Product>} 200.data - List of products
 * @return {object} 404 - Product not found
 * @security BearerAuth
 */

export async function getAll(req, res) {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    
    const { data, totalItems } = await list(page, limit);

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const hateoas = pagination("/admin/product", page, limit, totalItems);

    res.status(200).json({
      success: true,
      message: "Success getting list product",
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
 * GET /admin/product/{id}
 * @summary Get product detail
 * @tags Admin Product
 * @param {number} id.path.required - Product ID
 * @return {object} 200 - Success response
 * @return {object} 200.data - Product detail
 * @return {object} 404 - Product not found
 * @security BearerAuth
 */
export async function getDetail(req, res) {
    try {
        const product = await detailProduct(req.params.id)
        if (!product){
            res.status(404).json({
                success : false,
                message: "product not found"
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "success getting detail product",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}

/**
 * @typedef {object} EditProductRequest
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} stock - Product stock
 * @property {number} categoryId - Category ID
 * @property {string} description - Product description
 */

/**
 * PATCH /admin/product/{id}
 * @summary Update product
 * @tags Admin Product
 * @param {number} id.path.required - Product ID
 * @param {EditProductRequest} request.body.required - Product update payload
 * @return {object} 200 - Success response
 * @return {object} 404 - Product not found
 * @security BearerAuth
 */

export async function editProduct(req, res) {
    try {
        const product = await edit(req.params.id, req.body)

        await invalidateCache(pathRedis)
        return res.status(200).json({
            success: true,
            message: "success update product",
            data: product,
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
 * DELETE /admin/product/{id}
 * @summary Delete a product
 * @tags Admin Product
 * @param {number} id.path.required - Product ID
 * @return {object} 200 - Success response
 * @return {object} 404 - Product not found
 * @security BearerAuth
 */

export async function deleteProduct(req, res) {
    try {
        const product = await deleted(req.params.id)

        await invalidateCache(pathRedis)
        return res.status(200).json({
            success: true,
            message: "success deleted product",
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
 * @typedef {object} ProductInput
 * @property {string} image.required - Product images (minimum 1, maximum 3) - binary
 */

/**
 * POST /admin/product/upload/image/{id}
 * @summary Upload product images (max 3)
 * @tags Admin Product
 * @param {number} id.path.required - Product ID
 * @param {ProductInput} request.body.required - Product upload image payload - multipart/form-data
 * @return {object} 200 - Success response
 * @return {object} 400 - Error response for invalid files
 * @security BearerAuth
 */
export async function uploadImageProduct(req, res) {
  try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "error upload image"
        });
      }

      if (req.files.length > 3) {
        return res.status(400).json({
          success: false,
          message: "Upload a maximum of 3 images"
        });
      }
  
       await Promise.all(
        req.files.map(file => uploadImage(req.params.id, file.path))
      );

    return res.status(200).json({
      success: true,
      message: "Upload image berhasil",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}