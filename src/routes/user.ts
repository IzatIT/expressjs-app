import express, { Request, Response } from "express";
import { catchAsync } from "../middlewares";
import { UserController } from "../controllers/user";
import { authenticateToken, authorizeRole } from "../middlewares/auth";
import { USER_ROLES } from "../constants/user";

const router = express.Router()

router.post("/register", authenticateToken, authorizeRole([USER_ROLES.SUPER_ADMIN]), catchAsync(async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.register(req.body);
    res.status(201).json(response);
}));

router.post("/login", catchAsync(async (req: Request, res: Response) => {
    const controller = new UserController();
    const response = await controller.authorize(req.body);
    res.json(response);
}));

router.get("/", (req: Request, res: Response) => {
    res.json({ message: "Success" })
});

export default router