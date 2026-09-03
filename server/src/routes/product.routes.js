import { Router } from "express";
import { index, show, brands } from "../controllers/product.controller.js";
const router = Router();
router.get("/brands", brands);
router.get("/", index);
router.get("/:slug", show);
export default router;
