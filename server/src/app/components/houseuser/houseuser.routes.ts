import { Router } from "express";
import * as HouseUserRoutes from "./HouseUserController";

const router = Router();

router.post("/", HouseUserRoutes.createHouseUser);

router.patch("/:userId/:houseId", HouseUserRoutes.updateHouseUser);

router.delete("/", HouseUserRoutes.deleteHouseUser);

export default router;
