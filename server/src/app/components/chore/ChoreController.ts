import { RequestHandler, Request, Response } from "express";
import { Chore } from "./chore.model";
import { PrismaClient } from "@prisma/client";
import { User } from "../user/user.model";
import { House } from "../house/house.model";
import { USERS } from "../user/UserController";
import { HOUSES } from "../house/HouseController";

const prisma = new PrismaClient();

export const CHORES: Chore[] = [];

export const createChore: RequestHandler = async (
	req: Request,
	res: Response
) => {
	try {
		const chore = await prisma.chore.create({
			data: req.body,
		});

		//TODO: add back in
		// const userIndex = USERS.findIndex(i => i.id === chore.assigneeId);
		// const houseIndex = HOUSES.findIndex(i => i.id === chore.houseId);
		// const newChore = new Chore(chore.id, chore.title, USERS[userIndex], HOUSES[houseIndex], chore.time ?? undefined);
		const user = await prisma.user.findUnique({
			where: {
				id: String(chore.assigneeId),
			},
		});
		const house = await prisma.house.findUnique({
			where: {
				id: Number(chore.houseId),
			},
		});
		const houseOwner = await prisma.user.findUnique({
			where: {
				id: String(house?.ownerId),
			},
		});

		if (user && house && houseOwner) {
			const choreUser = new User(user.id, user.name);
			const choreHouseOwner = new User(houseOwner.id, houseOwner.name);
			const choreHouse = new House(house.id, house.houseName, choreHouseOwner);
			const newChore = new Chore(
				chore.id,
				chore.title,
				choreUser,
				choreHouse,
				chore.time ?? undefined
			);
			CHORES.push(newChore);
		} else {
			throw new Error("an issue has occurred");
		}

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
			include: { assignee: true, house: true },
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
		//TODO: add back in
		// const choreIndex = CHORES.findIndex(i => i.id === Number(id));
		// if (choreIndex < 0) {
		//     throw new Error('an error has occurred');
		// }
		// CHORES.splice(choreIndex, 1);
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
        //TODO: add back
		// const choreIndex = CHORES.findIndex((i) => i.id === Number(id));
		// if (choreIndex < 0) {
		// 	throw new Error("an error has occurred");
		// }
		const chore = await prisma.chore.update({
			where: {
				id: Number(id),
			},
			data: req.body,
			include: { house: true, assignee: true },
		});
		if (chore) {
            //TODO: add back
			// const userIndex = USERS.findIndex((i) => i.id === chore.assigneeId);
			// const houseIndex = HOUSES.findIndex((i) => i.id === chore.houseId);
			// const newChore = new Chore(
			// 	chore.id,
			// 	chore.title,
			// 	USERS[userIndex],
			// 	HOUSES[houseIndex]
			// );
			// CHORES.splice(choreIndex, 1);
			// CHORES.push(newChore);
			res.status(200).json({ message: "chore updated successfully" });
		} else {
			res.status(400).json({ message: "an error occurred" });
		}
	} catch (error) {
		res.status(400).json({ message: "an error occurred" });
	}
};
