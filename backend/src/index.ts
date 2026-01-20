import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes";
import cors from "cors";
const app = express();
const PORT = 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});