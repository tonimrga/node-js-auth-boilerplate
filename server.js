import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

import { connectDB } from "./db/index.js";
import { register, login, logout } from "./controllers/index.js";
import { adminAuth, userAuth } from "./middlewares/index.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();
connectDB();

// auth routes
app.post("/register", register);
app.post("/login", login);
app.post("/logout", logout);

// protected routes
app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/user", userAuth, (req, res) => res.send("User Route"));

// public route
app.get("/", (req, res) => res.send("Public Route"));

app.listen(process.env.PORT, () => console.log(`Server Connected to port ${process.env.PORT}`));

process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
});