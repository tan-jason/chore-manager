import { Router } from "express";
import * as ChoreRoutes from "./ChoreController";

const router = Router();

router.post("/", ChoreRoutes.createChore);

router.get("/", ChoreRoutes.getAllChores);

router.get("/:id", ChoreRoutes.getChoreById);

router.delete("/:id", ChoreRoutes.deleteChore);

router.patch("/:id", ChoreRoutes.updateChore);

export default router;
