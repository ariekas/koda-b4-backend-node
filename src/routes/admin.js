import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getAll, getDetail, uploadImageProduct } from "../controllers/admin/product.js";
import { createCategory, deleteCategory, detailCategory, editCategory, listCategory } from "../controllers/admin/category.js";
import upload from "../lib/middelware/uploadimage.js";

const router = Router()

router.post("/product", createProduct)
router.get("/products", getAll)
router.get("/product/:id", getDetail)
router.patch("/product/:id", editProduct)
router.delete("/product/:id", deleteProduct)
router.post("/product/upload/image/:id", upload.single("image"), uploadImageProduct)

router.post("/category", createCategory)
router.get("/categorys", listCategory)
router.get("/category/:id", detailCategory)
router.patch("/category/:id", editCategory)
router.delete("/category/:id", deleteCategory)

export default router