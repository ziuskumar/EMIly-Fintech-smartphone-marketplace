import { Router } from "express";
import { variant, emiPlans } from "../controllers/catalog.controller.js";
const router = Router();
router.get("/variants/:id", variant);
router.get("/variants/:id/emi-plans", emiPlans);
export default router;
