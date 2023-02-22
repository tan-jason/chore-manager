import express, {
	Application,
	json,
	NextFunction,
	Request,
	Response,
} from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./app/components/user/user.routes";
import houseRoutes from "./app/components/house/house.routes";
import choreRoutes from "./app/components/chore/chore.routes";
import houseUserRoutes from "./app/components/houseuser/houseuser.routes";
import authRoutes from "./app/middleware/auth.routes";

const prisma = new PrismaClient();

const port = process.env.PORT;
const app: Application = express();

app.use(json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: err.message });
});

// ----- users -----//
app.use("/users", userRoutes);

// ----- houses -----//
app.use("/houses", houseRoutes);

// ----- chores -----//
app.use("/chores", choreRoutes);

// ----- houseUser ----- //
app.use("/houseuser", houseUserRoutes);

// ----- auth -----//
app.use("/login", authRoutes);

// app.on('starting server', () => {
// 	const users = prisma.user.findMany({});
// })

app.listen(port, () =>
	console.log(`server running on http://localhost:${port}`)
);
