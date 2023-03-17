import { Router } from "express";
import * as UserRoutes from "./UserController";

const router = Router();

router.post('/', UserRoutes.createUser);

router.get('/', UserRoutes.getAllUsers);

router.get('/:id', UserRoutes.getUserById);

router.patch('/:id', UserRoutes.updateUser);

router.delete('/:id', UserRoutes.deleteUser);


export default router;