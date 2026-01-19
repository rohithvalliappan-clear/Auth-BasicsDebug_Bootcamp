import { Router, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { products } from "../data/products";

const router = Router();

router.get("/hello", (_req: AuthRequest, res: Response) => {
  res.send("Hello World!");
});

router.get("/products", (_req: AuthRequest, res: Response) => {
  res.json(products);
});

export default router;
