import { create, deleted, detail, edit, list } from "../../repositorys/category.js";

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