import { Router } from "express";
import * as HouseRoutes from "./HouseController";

const router = Router();

router.post("/", HouseRoutes.createHouse);

router.get("/", HouseRoutes.getAllHouses);

router.get("/:id", HouseRoutes.getHouseById);

router.get("/v1/:houseCode", HouseRoutes.getHouseByHouseCode);

router.delete("/:id", HouseRoutes.deleteHouse);

router.patch("/:id", HouseRoutes.updateHouse);

export default router;
