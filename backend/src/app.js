import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import router from "./router.js";
import connectDB from "./db/connection.js";


const HOST = "http://localhost"
const PORT = 5000;

function main() {
    const app = express();
    app.use(cors({ origin: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`, credentials: true }))
    app.use(express.json());
    app.use(cookieParser())
    app.use("/api", router);

    app.use('/{*splat}', async (req, res) => {
        res.status(404).json({ message: "Cant find this route" })
    })

    app.listen(PORT, () => {
        console.log(`Listening on ${HOST}:${PORT}`)
    })
}
connectDB().then(() => main()).catch(console.error)