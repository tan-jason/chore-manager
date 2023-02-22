import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createChore: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		await prisma.chore.create({
			data: req.body,
		});

		res.status(200).json({ message: "chore created successfully" });
	} catch (error) {
		res.status(400).json({ message: "there was an issue with your request" });
	}
};

export const getAllChores: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const chores = await prisma.chore.findMany({});
		res.status(200).json(chores);
	} catch (error) {
		res.status(404).json("request unsuccessful");
	}
};

export const getChoreById: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		const chore = await prisma.chore.findUnique({
			where: {
				id: Number(id),
			},
			include: { user: true, house: true },
		});
		res.status(200).json(chore);
	} catch (error) {
		res.status(400).json("chore not found");
	}
};

export const deleteChore: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		await prisma.chore.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ message: "chore deleted" });
	} catch (error) {
		res.status(404).json("request unsuccessful");
	}
};

export const updateChore: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { id } = req.params;
		await prisma.chore.update({
			where: {
				id: Number(id),
			},
			data: req.body,
			include: { house: true, user: true },
		});
		res.status(200).json({ message: "chore updated successfully" });
	} catch (error) {
		res.status(400).json({ message: "an error occurred" });
	}
};
