import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createHouseUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { userId, houseId } = req.body;
		await prisma.houseUser.create({
			data: {
				houseId: Number(houseId),
				userId: String(userId),
			},
		});
		res.status(200).json({ message: "user added successfully" });
	} catch (error) {
		res.status(400).json({ message: "there was an issue with your request" });
	}
};

export const updateHouseUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { userId, houseId } = req.params;
		await prisma.houseUser.update({
			where: {
				userId_houseId: {
					userId: String(userId),
					houseId: Number(houseId),
				},
			},
			data: {
				userId: String(req?.body?.userId),
				houseId: Number(req?.body?.houseId),
			},
			include: { house: true, user: true },
		});
		res.status(200).json({ message: "user added to house successfully" });
	} catch (error) {
		res.status(400).json({ message: "bad request" });
	}
};

export const deleteHouseUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { userId, houseId } = req.params;
		await prisma.houseUser.delete({
			where: {
				userId_houseId: {
					userId: String(userId),
					houseId: Number(houseId),
				},
			},
		});
		res.status(200).json({ message: "user removed successfully" });
	} catch (error) {
		res.status(404).json({ message: "bad request" });
	}
};
