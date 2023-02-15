import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma: PrismaClient = new PrismaClient();
const app: Express = express();
const port = process.env.PORT;

app.get('/adduser', async (req: Request, res: Response) => {
    console.log(req);
    const { name } = req.body;
    const user = await prisma.user.create({
        data: {
            name: name,
        }
    })
    res.json(user);
}) 

app.listen(port, () => {
    console.log(`server is live on http://localhost:${port}`);
})