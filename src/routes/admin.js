import { Router } from "express";
import { createProduct, getAll, getDetail } from "../controllers/admin/product.js";

const router = Router()

router.post("/product", createProduct)
router.get("/products", getAll)
router.get("/product/:id", getDetail)

export default router