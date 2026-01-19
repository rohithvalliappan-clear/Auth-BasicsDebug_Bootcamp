import express from "express";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middleware/auth";
import unprotectedRoutes from "./routes/unprotected";
import protectedRoutes from "./routes/protected";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

// Unprotected routes
app.use(unprotectedRoutes);
