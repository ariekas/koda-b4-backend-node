import { create, deleted, detailProduct, edit, list, uploadImage } from "../../repositorys/product.js";

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

export async function editProduct(req, res) {
    try {
        const product = await edit(req.params.id, req.body)
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

export async function deleteProduct(req, res) {
    try {
        const product = await deleted(req.params.id)

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