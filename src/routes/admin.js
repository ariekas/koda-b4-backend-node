import { Router } from "express";
import { createProduct } from "../controllers/admin/product.js";

const router = Router()

router.post("/product", createProduct)


export default router