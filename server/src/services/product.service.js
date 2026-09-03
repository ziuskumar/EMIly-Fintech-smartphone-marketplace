import { prisma } from "../lib/prisma.js";

const includes = {
  variants: { include: { emiPlans: { orderBy: { tenure: "asc" } } } },
};
export async function listProducts(query) {
  const { search, brand, minPrice, maxPrice, sort = "featured" } = query;
  const where = {
    ...(brand ? { brand: { equals: brand, mode: "insensitive" } } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const products = await prisma.product.findMany({
    where,
    include: includes,
    orderBy: sort === "newest" ? { createdAt: "desc" } : { featured: "desc" },
  });
  let filtered = products.filter((p) =>
    p.variants.some(
      (v) =>
        (!minPrice || v.sellingPrice >= Number(minPrice)) &&
        (!maxPrice || v.sellingPrice <= Number(maxPrice)),
    ),
  );
  if (sort === "price-asc" || sort === "price-desc")
    filtered.sort(
      (a, b) =>
        (Math.min(...a.variants.map((v) => v.sellingPrice)) -
          Math.min(...b.variants.map((v) => v.sellingPrice))) *
        (sort === "price-asc" ? 1 : -1),
    );
  return filtered;
}
export async function getProductBySlug(slug) {
  return prisma.product.findUnique({ where: { slug }, include: includes });
}
export async function listBrands() {
  const rows = await prisma.product.findMany({
    select: { brand: true },
    distinct: ["brand"],
    orderBy: { brand: "asc" },
  });
  return rows.map((x) => x.brand);
}
