import { Router } from "express";
import * as AuthRouter from "./AuthController";

const router = Router();

router.post("/", AuthRouter.loginUser);

export default router;
