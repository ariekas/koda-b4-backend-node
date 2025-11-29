import { productFavourite } from "../../repositorys/product.js";

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
