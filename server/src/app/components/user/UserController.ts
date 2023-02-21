import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "./user.model";

const prisma = new PrismaClient();

export const USERS: User[] = [];

export const createUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const { name } = req.body;

	try {
		const user = await prisma.user.create({
			data: {
				name: name,
			},
		});
		const newUser = new User(user.id, user.name);
		USERS.push(newUser);
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
		const userIndex = USERS.findIndex((i) => i.id === id);
		// if (userIndex < 0) {
		// 	throw new Error('could not find user');
		// }
		await prisma.houseUser.deleteMany({
			where: {
				userId: String(id),
			},
		});
		await prisma.chore.updateMany({
			where: {
				assigneeId: String(id)
			},
			data: {
				assigneeId: null,
			}
		});
		//TODO: once make HouseUser model, remove user from HouseUsers
		await prisma.user.delete({
			where: {
				id: String(id),
			},
		});
		// USERS.splice(userIndex, 1);
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
    res: Response,
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
}
