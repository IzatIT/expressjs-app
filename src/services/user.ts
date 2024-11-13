import { User, UserCreationAttributes } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/user';

export class UserService {
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = JWT_SECRET
    }

    public async register(userData: UserCreationAttributes): Promise<User> {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = { ...userData, password: hashedPassword }
        const [user] = await User.findOrCreate({ where: { inn: newUser.inn }, defaults: newUser });
        return user;
    }

    public async login(login: string, password: string,): Promise<any> {
        const user = await User.findOne({ where: { login: login } });
        if (!user) {
            throw new Error("404");
        }
        let isPasswordValid = false
        isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("401");
        }
        const accessToken = this.generateToken(user);
        return { accessToken, refreshToken: "213123", ...user.dataValues };
    }

    private generateToken(user: User): string {
        return jwt.sign(
            { id: user.id, login: user.login, password: user.password, role: user.role },
            this.jwtSecret,
            { expiresIn: '2h' }
        );
    }
}
