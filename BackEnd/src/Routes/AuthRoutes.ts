import express, { Request, Response } from "express";
const router = express.Router();

//for register
router.get("/auth/register", async (req: Request, res: Response) => {
    if (req.body) res.send("invalid information");
    console.log(req.body);
});

export default router;
