import { Router } from "express";
import { filterProducts, getFavourite } from "../controllers/user/product.js";
import upload from "../lib/middelware/uploadimage.js";
import { getProfile, updateUser } from "../controllers/user/user.js";
import { getDetail } from "../controllers/admin/product.js";
import { createCart, deletedCartItem, getListCart } from "../controllers/user/cart.js";
import { addTransaction } from "../controllers/user/transaction.js";
import { getDetailHistory, getListHistory } from "../controllers/user/history.js";

const router = Router()

router.get("/product/favorite", getFavourite)
router.get("/profile", getProfile)
router.patch("/profile", upload.single("pic"), updateUser)
router.get("/product/filter", filterProducts)
router.get("/product/:id", getDetail)
router.get("/carts", getListCart)
router.post("/cart", createCart)
router.delete("/cart/:id", deletedCartItem)
router.post("/transaction", addTransaction)
router.get("/historys", getListHistory)
router.get("/history/:id", getDetailHistory)

export default router