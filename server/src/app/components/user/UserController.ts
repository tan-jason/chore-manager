import { Router } from "express";

export class UserController implements AppRoute {
    public route = '/users';
    public router: Router = Router();
    
    
}