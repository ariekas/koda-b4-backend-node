import { Router } from "express";
import { filterProducts, getFavourite } from "../controllers/user/product.js";
import upload from "../lib/middelware/uploadimage.js";
import { getProfile, updateUser } from "../controllers/user/user.js";
import { getDetail } from "../controllers/admin/product.js";


const router = Router()

router.get("/product/favorite", getFavourite)
router.get("/user/profile", getProfile)
router.patch("/user/profile", upload.single("pic"), updateUser)
router.get("/product/filter", filterProducts)
router.get("/product/:id", getDetail)

export default router