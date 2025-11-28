import { create, list, detailDiscount, deleted, edit } from "../../repositorys/discount.js";


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