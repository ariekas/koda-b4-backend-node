import { Router } from "express";
import { getFavourite } from "../controllers/user/product.js";
import upload from "../lib/middelware/uploadimage.js";
import { getProfile } from "../controllers/user/user.js";

const router = Router()

router.get("/product/favorite", getFavourite)
router.get("/user/profile", getProfile)

export default router