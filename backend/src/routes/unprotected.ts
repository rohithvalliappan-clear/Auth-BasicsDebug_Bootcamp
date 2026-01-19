import { Router, Response } from "express";
import { products } from "../data/products";

const router = Router();

router.get("/hello", (_req: any, res: Response) => {
  res.send("Hello World!");
});

router.get("/products", (_req: any, res: Response) => {
  res.json(products);
});

export default router;
