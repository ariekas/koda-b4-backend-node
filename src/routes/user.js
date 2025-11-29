import { Router } from "express";
import { getFavourite } from "../controllers/user/product.js";
import upload from "../lib/middelware/uploadimage.js";

const router = Router()

router.get("/product/favorite", getFavourite)

export default router