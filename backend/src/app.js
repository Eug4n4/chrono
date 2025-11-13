import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./router.js";
import connectDB from "./db/connection.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const HOST = "http://localhost";
const PORT = 5000;
const __dirname = dirname(fileURLToPath(import.meta.url));

function main() {
    const app = express();
    app.use(
        cors({
            origin: `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
            credentials: true,
        }),
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(
        "/storage/",
        express.static(path.join(__dirname, "..", "storage/")),
    );
    app.use("/api", router);

    app.use("/{*splat}", (req, res) => {
        res.status(404).json({ message: "Cant find this route" });
    });

    app.listen(PORT, () => {
        console.log(`Listening on ${HOST}:${PORT}`);
    });
}
connectDB()
    .then(() => main())
    .catch(console.error);
