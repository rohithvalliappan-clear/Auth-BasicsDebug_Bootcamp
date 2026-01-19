import express from "express";
import cookieParser from "cookie-parser";
import unprotectedRoutes from "./routes/unprotected";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

// Unprotected routes
app.use(unprotectedRoutes);
