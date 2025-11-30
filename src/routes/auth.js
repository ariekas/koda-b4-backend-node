import { Router } from "express";
import { forgetPassword, login, register, resetPasswordUser } from "../controllers/auth.js";

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/forget-password", forgetPassword)
router.post("/reset-password", resetPasswordUser)


export default router