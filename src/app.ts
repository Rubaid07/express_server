import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

// parser
app.use(express.json());
// app.use(express.urlencoded());

// initializing DB
initDB();



app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

// ------------------Users CRUD------------------
app.use("/users", userRoutes)

//  ------------------TODOS CRUD------------------
app.use("/todos", todoRoutes)

//  ------------------Auth Routes------------------
app.use("/auth", authRoutes)

// not found route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;