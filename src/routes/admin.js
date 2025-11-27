import { Router } from "express";
import { createProduct, getAll } from "../controllers/admin/product.js";

const router = Router()

router.post("/product", createProduct)
router.get("/products", getAll)


export default router