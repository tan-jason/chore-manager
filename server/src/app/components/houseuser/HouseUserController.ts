import { RequestHandler, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { HouseUser } from "./houseuser.model";
import { USERS } from "../user/UserController";
import { HOUSES } from "../house/HouseController";

const prisma = new PrismaClient();

export const HOUSEUSERS: HouseUser[] = [];

export const createHouseUser: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const { userId, houseId } = req.body;
		const houseUser = await prisma.houseUser.create({
			data: {
				houseId: Number(houseId),
				userId: String(userId),
			},
		});
		// TODO: add back
		// const userIndex = USERS.findIndex((i) => i.id === houseUser.userId);
		// const houseIndex = HOUSES.findIndex((i) => i.id === houseUser.houseId);
		// const newHouseUser = new HouseUser(
		// 	houseUser.id,
		// 	USERS[userIndex],
		// 	HOUSES[houseIndex]
		// );
		// HOUSEUSERS.push(newHouseUser);
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
		const houseUser = await prisma.houseUser.update({
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
		// TODO: add back
		// const houseUserIndex = HOUSEUSERS.findIndex(i => i.id === houseUser.id);
		// const userIndex = USERS.findIndex(i => i.id === houseUser.userId);
		// const houseIndex = HOUSES.findIndex(i => i.id === houseUser.houseId);
		// if (houseUserIndex && userIndex && houseIndex) {
		// 	const newHouseUser = new HouseUser(
		// 		houseUser.id,
		// 		USERS[userIndex],
		// 		HOUSES[houseIndex]
		// 	);
		// 	HOUSEUSERS.splice(houseUserIndex, 1);
		// 	HOUSEUSERS.push(newHouseUser);
		// } else {
        //     res.status(422).json({ message: "an error has occurred" });
        // }

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
		const houseUser = await prisma.houseUser.delete({
			where: {
				userId_houseId: {
					userId: String(userId),
					houseId: Number(houseId),
				},
			},
		});
		// TODO: add back
		// const houseUserIndex = HOUSEUSERS.findIndex(i => i.id === houseUser.id);
		// if (houseUserIndex < 0) {
		//     res.status(422).json({ message: "an error has occurred" });
		// }
		// HOUSEUSERS.splice(houseUserIndex, 1);
		res.status(200).json({ message: "user removed successfully" });
	} catch (error) {
		res.status(404).json({ message: "bad request" });
	}
};
