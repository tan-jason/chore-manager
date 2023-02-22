import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

require("dotenv").config();

const prisma = new PrismaClient();

export const loginUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { username, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				username: String(username),
			},
		});

		if (user && user.password === password) {
			const token = jwt.sign(
				{ user_id: user.id, username },
				process.env.TOKEN_KEY!,
				{
					expiresIn: "2w",
				}
			);
			await prisma.user.update({
				where: {
					username: String(username),
				},
				data: {
					token: token,
				},
			});
			res.status(200).json({ message: "successfully logged in" });
		} else {
			res
				.status(400)
				.json({ message: "your username or password is incorrect" });
		}
	} catch (error) {
		res.status(404).json({ message: "an error has occurred" });
	}
};
