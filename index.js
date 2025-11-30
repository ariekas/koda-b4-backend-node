import express, {json} from "express"
import mainRouter from "./src/routes/index.js"
import { swaggerDocs } from "./src/lib/config/swagger.js";

const app = express()
app.use(express.json());

swaggerDocs(app)

app.use("/image", express.static("uploads"));

app.get("/", (req, res) => {
    res.status(201).json({
        success : true,
        message : "Backend Running"
    })
})

app.use("/", mainRouter)

app.listen(2020, () => {
    console.log("Back end running on http:://localhost:2020")
    console.log("Swagger docs at http://localhost:2020/api-docs");
})