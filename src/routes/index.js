import { Router } from "express";
import authRouter from "./auth.js"
import adminRouter from "./admin.js"
import userRouter from "./user.js"
import { verifToken } from "../lib/middelware/veriftoken.js";
import { checkRole } from "../lib/middelware/verifrole.js";
let router = Router()

router.use("/auth", authRouter)
// router.use("/admin", verifToken, checkRole("admin"), adminRouter)
router.use("/admin", adminRouter)
router.use("/", userRouter)

export default router