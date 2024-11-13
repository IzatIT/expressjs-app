// userController.ts
import { Body, Post, Route } from "tsoa";
import { User, UserAttributes, UserCreationAttributes } from "../models/user"; // Ensure correct import
import { UserService } from "../services/user";

type AuthResponse = UserAttributes

@Route("api/v1/user")
export class UserController {
    private userService = new UserService();

    @Post("/register")
    public async register(@Body() userData: UserCreationAttributes): Promise<AuthResponse> {
        const res = await this.userService.register(userData);
        return res;
    }

    @Post("/login")
    public async authorize(@Body() body: { login: string; password: string }): Promise<AuthResponse> {
        const { login, password } = body;
        const response = await this.userService.login(login, password);
        return response;
    }
}
