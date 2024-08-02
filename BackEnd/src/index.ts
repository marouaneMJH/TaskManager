import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cardRoutes from "./Routes/CardRoutes.js";
import listRoutes from "./Routes/ListRoutes.js";

import GetTaskFromDB from "./Controllers/GetTaskFromDB.js";
import db from "./Config/PgConfig.js";

const app = express();
const port = 3000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "Public" directory
app.use(express.static(path.join(__dirname, "./../Public")));

// Routes

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
db.connect();

app.use("/", cardRoutes, listRoutes);
//adding the data to DB to Tasks table
app.post("/", async (req: Request, res: Response) => {
    const data = req.body;
    //cleaning data
    if (req.body.title != undefined && req.body.description != undefined) {
        try {
            if (req.body.title != "") {
                await db.query(
                    "INSERT INTO tasks (title, description) VALUES ($1, $2)",
                    [data.title, data.description]
                ); // adding to DB
                res.send("Task data submited successfully");
                console.log("element add easy.");
            } else {
                res.status(400).send("Missing title");
                console.log("Missing title");
            }
        } catch (error) {
            res.status(500).send("Task data submited  failed"); // tell the user the
        }
    } else {
        res.status(400).send("Missing title or description");
        console.log("Missing title or description");
    }
    // res.redirect("http://localhost:5173/");
});

app.get("/task1", async (req: Request, res: Response) => {
    const result = await GetTaskFromDB();
    console.log(result);
    res.json(result);
});

app.get("/404", (req: Request, res: Response) => {
    res.status(404).sendFile(path.join(__dirname, "./../Public", "error.html"));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
