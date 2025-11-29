import { productFavourite, filter } from "../../repositorys/product.js";

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

    let categoryFilter = category;
    if (category && typeof category === "string" && category.includes(",")) {
      categoryFilter = category.split(",").map(Number);
    }

    const filteredProduct = await filter({
      search,
      category: categoryFilter,
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
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Filter product failed",
      error: error.message
    });
  }
}
