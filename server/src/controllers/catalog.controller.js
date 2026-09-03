import { prisma } from "../lib/prisma.js";
import { AppError } from "../utils/appError.js";
export async function variant(req, res, next) {
  try {
    const data = await prisma.variant.findUnique({
      where: { id: req.params.id },
      include: { product: true, emiPlans: { orderBy: { tenure: "asc" } } },
    });
    if (!data) throw new AppError("Variant not found", 404);
    res.json({ data });
  } catch (e) {
    next(e);
  }
}
export async function emiPlans(req, res, next) {
  try {
    const variant = await prisma.variant.findUnique({
      where: { id: req.params.id },
      select: { id: true },
    });
    if (!variant) throw new AppError("Variant not found", 404);
    const data = await prisma.emiPlan.findMany({
      where: { variantId: req.params.id },
      orderBy: { tenure: "asc" },
    });
    res.json({ data });
  } catch (e) {
    next(e);
  }
}
