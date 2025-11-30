import { addCartItems, deleteCartItem } from "../../repositorys/cart.js";

export async function createCart(req, res) {
  try {
    const userId = req.jwtPaload.id;

    const result = await addCartItems(userId, req.body, req.body.quantity);

    return res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}

export async function deletedCartItem(req, res) {
  try {
     await deleteCartItem(req.params.id)

    return res.status(201).json({
      success: true,
      message: "success delete cart item",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Server",
      error: error.message,
    });
  }
}