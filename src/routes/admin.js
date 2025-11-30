import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getAll, getDetail, uploadImageProduct } from "../controllers/admin/product.js";
import { createCategory, deleteCategory, detailCategory, editCategory, listCategory } from "../controllers/admin/category.js";
import { createDiscount, listDiscount, getDetailDiscount, editDiscount, deleteDiscount } from "../controllers/admin/discount.js";
import { detailUser, listUser, updateRoleUser } from "../controllers/admin/users.js";
import upload from "../lib/middelware/uploadimage.js";
import { caching } from "../lib/middelware/caching.js"
import { getListTransactions } from "../controllers/admin/transaction.js";
import { getDetailHistory } from "../controllers/user/history.js";

const router = Router()

router.patch("/user/role/:id", updateRoleUser)
router.get("/users", listUser)
router.get("/user/:id", detailUser)

router.post("/product", createProduct)
router.get("/products",caching(15), getAll)
router.get("/product/:id",caching(15), getDetail)
router.patch("/product/:id", editProduct)
router.delete("/product/:id", deleteProduct)
router.post("/product/upload/image/:id", upload.array("image"), uploadImageProduct)

router.post("/category", createCategory)
router.get("/categorys", listCategory)
router.get("/category/:id", detailCategory)
router.patch("/category/:id", editCategory)
router.delete("/category/:id", deleteCategory)

router.post("/discount", createDiscount)
router.get("/discounts", listDiscount)
router.get("/discount/:id", getDetailDiscount)
router.patch("/discount/:id", editDiscount)
router.delete("/discount/:id", deleteDiscount)

router.get("/transactions",caching(15), getListTransactions)
router.get("/transaction/:id", getDetailHistory)

export default router