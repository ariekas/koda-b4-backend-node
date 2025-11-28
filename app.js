import express, {json} from "express"
import mainRouter from "./src/routes/index.js"

const app = express()
app.use(express.json());

app.use("/", mainRouter)
app.get("/", (req, res) => {
    res.status(201).json({
        success : true,
        message : "Backend Running"
    })
})


export default app;