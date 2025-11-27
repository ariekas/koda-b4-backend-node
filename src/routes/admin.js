import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getAll, getDetail } from "../controllers/admin/product.js";

const router = Router()

router.post("/product", createProduct)
router.get("/products", getAll)
router.get("/product/:id", getDetail)
router.patch("/product/:id", editProduct)
router.delete("/product/:id", deleteProduct)

export default router