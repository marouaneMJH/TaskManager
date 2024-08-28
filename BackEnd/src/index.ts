import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"

import cardRoutes from "./Routes/CardRoutes.js";
import listRoutes from "./Routes/ListRoutes.js";
import authRoutes from "./Routes/AuthRoutes.js";
import boardRoutes from "./Routes/BoardRouter.js";
import db from "./Config/PgConfig.js";
import authenticateJWT from "./Middleware/AuthenticateJWT.js";

const app = express();
const port = 3000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "Public" directory
app.use(express.static(path.join(__dirname, "./../Public")));

// Middleware
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authenticateJWT);

// Connect to DB
db.connect();

// Routes
app.use("/", authRoutes, boardRoutes,cardRoutes, listRoutes);

app.get("/404", (req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, "./../Public", "error.html"));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
