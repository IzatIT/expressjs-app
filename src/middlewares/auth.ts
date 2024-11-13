import { Request, Response, NextFunction } from "express";
import { JWT_SECRET, USER_ROLES, UserRolesType } from "../constants/user";
import jwt from "jsonwebtoken";

// Middleware для проверки токена и декодирования роли
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
        if (err) {
            res.sendStatus(403);
            return;
        }

        req.user = decoded;
        next();
    });
};

export const authorizeRole = (allowedRoles: UserRolesType[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const userRole: UserRolesType | undefined = Object.values(USER_ROLES).find(el => el === req.user?.role);

        if (userRole && !allowedRoles.includes(userRole)) {
            res.sendStatus(403);
            return;
        }

        next();
    };
};
