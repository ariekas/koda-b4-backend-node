import { create, deleted, detail, edit, list } from "../../repositorys/category.js";

/**
 * @typedef {object} CreateCategory
 * @property {string} name.required - name
 */
/**
 * POST /admin/category
 * @summary Create category
 * @tags Admin Category
 * @param {CreateCategory} request.body.required - category payload
 * @return {object} 201 - success response
 */
export async function createCategory(req, res) {
  try {
    console.log(req.body)
    await create(req.body);
    
    res.status(201).json({
      success: true,
      message: "success create category",
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
 * GET /admin/categorys
 * @summary List category
 * @tags Admin Category
 * @return {object} 201 - success response
 */
export async function listCategory(req, res) {
    try {
        const category = await list(req.body)
        if(!category) {
            res.status(404).json({
                success : false,
                message: "category not found"
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "success getting list category",
            data: category
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
 * GET /admin/category/{id}
 * @summary Get detail category
 * @tags Admin Category
 * @param {number} id.path.required - Category ID
 * @return {object} 201 - success response
 * @return {object} 404 - category not found
 */
export async function detailCategory(req, res) {
    try {
        const category = await detail(req.params.id)
        if (!category){
            res.status(404).json({
                success : false,
                message: "category not found"
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "success getting detail category",
            data: category
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
 * @typedef {object} UpdateCategory
 * @property {string} name.required - Category name
 */
/**
 * PATCH /admin/category/{id}
 * @summary Update category
 * @tags Admin Category
 * @param {number} id.path.required - Category ID
 * @param {UpdateCategory} request.body.required - Category update payload
 * @return {object} 201 - success response
 * @return {object} 201.data - Updated category data
 */
export async function editCategory(req, res) {
    try {
        const category = await edit(req.params.id, req.body)
        return res.status(200).json({
            success: true,
            message: "success update category",
            data: category,
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
 * DELETE /admin/category/{id}
 * @summary Delete category
 * @tags Admin Category
 * @param {number} id.path.required - Category ID
 * @return {object} 201 - success response
 */
export async function deleteCategory(req, res) {
    try {
        const category = await deleted(req.params.id)

        return res.status(200).json({
            success: true,
            message: "success deleted category",
          });
    } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error Server",
            error: error.message,
          });
    }
}