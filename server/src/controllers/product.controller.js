import { z } from "zod";
import * as products from "../services/product.service.js";
import { AppError } from "../utils/appError.js";
const querySchema = z.object({
  search: z.string().max(80).optional(),
  brand: z.string().max(50).optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  sort: z.enum(["featured", "newest", "price-asc", "price-desc"]).optional(),
});
export async function index(req, res, next) {
  try {
    const q = querySchema.parse(req.query);
    res.json({ data: await products.listProducts(q) });
  } catch (e) {
    next(e);
  }
}
export async function show(req, res, next) {
  try {
    const product = await products.getProductBySlug(req.params.slug);
    if (!product) throw new AppError("Product not found", 404);
    res.json({ data: product });
  } catch (e) {
    next(e);
  }
}
export async function brands(req, res, next) {
  try {
    res.json({ data: await products.listBrands() });
  } catch (e) {
    next(e);
  }
}
