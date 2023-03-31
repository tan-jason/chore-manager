import express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import userRoutes from "./app/components/user/user.routes";
import houseRoutes from "./app/components/house/house.routes";
import choreRoutes from "./app/components/chore/chore.routes";
import houseUserRoutes from "./app/components/houseuser/houseuser.routes";
import authRoutes from "./app/middleware/auth.routes";
import { verifyToken } from "./app/middleware/AuthController";

const cors = require("cors");
const port = process.env.PORT;
const app: Application = express();

app.use(json());

app.use(
  cors({
    origin: "*",
  })
);

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

app.post("/welcome", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ message: "welcome!", username: String(req.user) });
});

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
