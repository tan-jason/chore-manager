import express, { Application, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const port = process.env.PORT;
const app: Application = express();

app.use(express.json());

// ----- users -----//
app.post("/users", async (req: Request, res: Response) => {
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

export const getUserById = () => {
	app.get("/users/:id", async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const user = await prisma.user.findUnique({
				where: {
					id: String(id),
				},
				include: { houses: true, chores: true },
			});
			res.status(200).json(user);
		} catch (error) {
			res.status(404).json("user not found");
		}
	});
};

app.delete("/users/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.houseUser.deleteMany({
			where: {
				userId: String(id),
			},
		});
		await prisma.user.delete({
			where: {
				id: String(id),
			},
		});
		res.status(200).json({ message: "user deleted" });
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: "request unsuccessful" });
	}
});

export const getAllUsers = () => {
	app.get("/users", async (req: Request, res: Response) => {
		try {
			const users = await prisma.user.findMany({});
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ message: "request unsuccessful" });
		}
	});
};

// ----- houses -----//
app.post("/houses", async (req: Request, res: Response) => {
	try {
		const { houseName, ownerId } = req.body;
		const house = await prisma.house.create({
			data: {
				houseName: houseName,
				ownerId: ownerId,
			},
		});
		await prisma.houseUser.create({
			data: {
				userId: ownerId,
				houseId: house.id,
			},
		});
		res.status(200).json({ message: "house created successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "there was an issue with your request" });
	}
});

app.get("/houses/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const house = await prisma.house.findUnique({
			where: {
				id: Number(id),
			},
			include: { houseOwner: true, chores: true, users: true },
		});
		res.status(200).json(house);
	} catch (error) {
		res.status(404).json("house not found");
	}
});

app.delete("/houses/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.house.delete({
			where: {
				id: Number(id),
			},
		});
		res.status(200).json({ message: "house deleted" });
	} catch (error) {
		res.status(404).json("request unsuccessful");
	}
});

app.get("/houses", async (req: Request, res: Response) => {
	try {
		const houses = await prisma.house.findMany({});
		res.status(200).json(houses);
	} catch (error) {
		res.status(500).json({ message: "request unsuccessful" });
	}
});

app.patch("/houses/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.house.update({
			where: {
				id: Number(id),
			},
			data: req.body,
			include: { chores: true, houseOwner: true, users: true },
		});
		res.status(200).json({ message: "house updated successfully" });
	} catch (error) {
		res.status(400).json("an error occurred");
	}
});

// ----- chores -----//
app.post("/chores", async (req: Request, res: Response) => {
	try {
		await prisma.chore.create({
			data: req.body,
		});
		res.status(200).json({ message: "chore created successfully" });
	} catch (error) {
		res.status(400).json({ message: "there was an issue with your request" });
	}
});

app.get("/chores", async (req: Request, res: Response) => {
	try {
		const chores = await prisma.chore.findMany({});
		res.status(200).json(chores);
	} catch (error) {
		res.status(404).json("request unsuccessful");
	}
});

app.get("/chores/:id", async (req: Request, res: Response) => {
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
});

app.delete("/chores/:id", async (req: Request, res: Response) => {
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
});

app.patch("/chores/:id", async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		await prisma.chore.update({
			where: {
				id: Number(id),
			},
			data: req.body,
			include: { house: true, assignee: true },
		});
		res.status(200).json({ message: "chore updated successfully" });
	} catch (error) {
		res.status(400).json({ message: "an error occurred" });
	}
});

// ----- houseUser ----- //
app.post("/houseuser", async (req: Request, res: Response) => {
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
});

app.patch(
	"/houseuser/:userId/:houseId",
	async (req: Request, res: Response) => {
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
	}
);

app.delete(
	"/houseuser/:userId/:houseId",
	async (req: Request, res: Response) => {
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
	}
);

app.listen(port, () =>
	console.log(`server running on http://localhost:${port}`)
);
