import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { name, username, password } = req.body;

	try {
		const user = await prisma.user.create({
			data: {
				name: name,
				username: username,
				password: password,
			},
		});

		const token = jwt.sign(
			{ user_id: user.id, username },
			process.env.TOKEN_KEY!,
			{
				expiresIn: "2h",
			}
		);
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				token: token,
			},
		});
		res.status(200).json({ message: "user created successfully" });
	} catch (error) {
		res.status(400).json({ message: "there was an issue with your request" });
	}
};

export const deleteUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		await prisma.houseUser.deleteMany({
			where: {
				userId: String(id),
			},
		});
		await prisma.chore.updateMany({
			where: {
				userId: String(id),
			},
			data: {
				userId: null,
			},
		});
		await prisma.user.delete({
			where: {
				id: String(id),
			},
		});
		res.status(200).json({ message: "user deleted" });
	} catch (error) {
		res.status(404).json({ message: "request unsuccessful" });
	}
};

export const getAllUsers: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const users = await prisma.user.findMany({
			include: { chores: true, houses: true, housesOwned: true },
		});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "request unsuccessful" });
	}
};

export const getUserById: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const user = await prisma.user.findUnique({
			where: {
				id: String(id),
			},
			include: { houses: true, chores: true, housesOwned: true },
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json("user not found");
	}
};
