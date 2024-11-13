import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import cors from "cors"
import { db } from './db';
import { User } from './models/user';
import { USER_ROLES } from './constants/user';
import UserRoutes from './routes/user';
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config()

const app: Application = express();
const { PORT = 8000 } = process.env;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json())
app.use("/api/v1/user", UserRoutes);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
)

app.get("*", (req, res) => {
  res.status(505).json({ message: "Bad Request" });
});

app.listen(PORT, async () => {
  await db.sync().then(() => {
    console.log("Connected to database")
  })
  try {
    const adminPass = await bcrypt.hash("123", 10)
    await User.findOrCreate({
      where: { login: "admin" },
      defaults: {
        age: 20,
        fullname: "Super Admin",
        inn: "admin",
        login: "admin",
        password: adminPass,
        role: USER_ROLES.SUPER_ADMIN,
        sex: true,
      }
    });
    console.log("created")
  } catch (error) {
    console.log(error)
  }
})
