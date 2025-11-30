import { create, list, detailDiscount, deleted, edit } from "../../repositorys/discount.js";

/**
 * @typedef {object} CreateDiscount
 * @property {string} name.required - Discount name
 * @property {number} discount.required - Discount percentage
 * @property {number} productId.required - ProductId percentage
 * 
 */
/**
 * POST /admin/discount
 * @summary Create discount
 * @tags Admin Discount
 * @param {CreateDiscount} request.body.required - Discount payload
 * @return {object} 201 - success response
 * @return {object} 500 - Error Server
 */
export async function createDiscount(req, res) {
  try {
    await create(req.body);
    
    res.status(201).json({
      success: true,
      message: "success create discount",
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
 * @typedef {object} DiscountResponse
 * @property {number} id - Discount ID
 * @property {string} name - Discount name
 * @property {number} discount - Discount percentage
 * @property {string} [description] - Description
 * @property {number} [productId] - Related product ID
 * @property {string} created_at - Creation datetime
 * @property {string} updated_at - Last update datetime
 */
/**
 * GET /admin/discounts
 * @summary Get list of all discounts
 * @tags Admin Discount
 * @return {object} 201 - success response
 * @return {array<DiscountResponse>} 200.data - List of discounts
 * @return {object} 500 - Error Server
 */
export async function listDiscount(req, res) {
    try {
        const discount = await list(req.body)

        res.status(201).json({
            success: true,
            message: "success getting list discount",
            data: discount
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
 * GET /admin/discount/{id}
 * @summary Get discount detail
 * @tags Admin Discount
 * @param {number} id.path.required - Discount ID
 * @return {object} 201 - success response
 * @return {DiscountResponse} 200.data - Discount detail
 * @return {object} 404 - discount not found
 * @return {object} 500 - Error Server
 */
export async function getDetailDiscount(req, res) {
    try {
        const discount = await detailDiscount(req.params.id)
        if (!discount){
            res.status(404).json({
                success : false,
                message: "discount not found"
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "success getting detail discount",
            data: discount
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
 * PATCH /admin/discount/{id}
 * @summary Update discount
 * @tags Admin Discount
 * @param {number} id.path.required - Product ID
 * @param {CreateDiscount} request.body.required - Discount payload
 * @return {object} 201 - success update
 * @return {object} 500 - Error Server
 */
export async function editDiscount(req, res) {
    try {
         await edit(req.params.id, req.body)
        return res.status(200).json({
            success: true,
            message: "success update discount",
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
 * DELETE /admin/discount/{id}
 * @summary Delete discount
 * @tags Admin Discount
 * @param {number} id.path.required - Discount ID
 * @return {object} 201 - success delete
 * @return {object} 500 - Error Server
 */
export async function deleteDiscount(req, res) {
    try {
         await deleted(req.params.id)

        return res.status(200).json({
            success: true,
            message: "success deleted discount",
          });
    } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}