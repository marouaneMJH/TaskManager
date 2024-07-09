import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import ITask from "./Interfaces/ITask.js";
import GetTaskFromDB from "./Controllers/GetTaskFromDB.js";
import db from "./Controllers/ConnectClient.js";
import { title } from "process";

// import path from "path";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to DB
db.connect();

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

app.get("/task1", async(req: Request, res: Response) => {
    const result = await GetTaskFromDB();
    console.log(result)
    res.json(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
