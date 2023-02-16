import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.post("/", async (req: Request, res: Response<Object>) => {
    const { name } = req.body;
    console.log(name);

    try {
        await prisma.user.create({
            data: {
                name: name,
            },
        });
        res.status(200).json({ message: "user created successfully" });
    } catch (error) {
        res.status(400).json({ message: "there was an issue with your request" });
    }
});

export default router;