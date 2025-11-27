import { create, detail, list } from "../../repositorys/admin/product.js";

export async function createProduct(req, res) {
  try {
    const product = await create(req.body);
    if (product.stock < 0) {
      res.status(401).json({
        success: false,
        message: "Stock much be more 0",
      });
      return;
    }

    if (product.price < 0) {
      res.status(401).json({
        success: false,
        message: "price much be more 0",
      });
      return;
    }
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

export async function getAll(req, res) {
    try {
        const product = await list(req.body)
        if(!product) {
            res.status(404).json({
                success : false,
                message: "product not found"
            })
            return
        }

        res.status(201).json({
            success: true,
            message: "success getting list product",
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

export async function getDetail(req, res) {
    try {
        const product = await detail(req.params.id)
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