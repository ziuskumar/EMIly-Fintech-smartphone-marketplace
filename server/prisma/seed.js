import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const phones = [
  [
    "Apple",
    "iPhone 16",
    "iphone-16",
    79900,
    ["128GB", "256GB"],
    ["Black", "Ultramarine"],
    "/images/iphone-collection.png",
  ],
  [
    "Apple",
    "iPhone 16 Pro",
    "iphone-16-pro",
    119900,
    ["128GB", "256GB"],
    ["Desert Titanium", "Black Titanium"],
    "/images/iphone-collection.png",
  ],
  [
    "Samsung",
    "Galaxy S25",
    "samsung-galaxy-s25",
    74999,
    ["128GB", "256GB"],
    ["Navy", "Icyblue"],
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Samsung",
    "Galaxy S25 Ultra",
    "samsung-galaxy-s25-ultra",
    129999,
    ["256GB", "512GB"],
    ["Titanium Black", "Titanium Silverblue"],
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Google",
    "Pixel 9",
    "google-pixel-9",
    64999,
    ["128GB", "256GB"],
    ["Obsidian", "Porcelain"],
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Google",
    "Pixel 9 Pro",
    "google-pixel-9-pro",
    99999,
    ["128GB", "256GB"],
    ["Hazel", "Rose Quartz"],
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "OnePlus",
    "OnePlus 13",
    "oneplus-13",
    69999,
    ["256GB", "512GB"],
    ["Midnight Ocean", "Arctic Dawn"],
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "OnePlus",
    "OnePlus Nord 4",
    "oneplus-nord-4",
    32999,
    ["128GB", "256GB"],
    ["Mercurial Silver", "Obsidian Midnight"],
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Xiaomi",
    "Xiaomi 14",
    "xiaomi-14",
    69999,
    ["256GB", "512GB"],
    ["Jade Green", "Black"],
    "https://images.unsplash.com/photo-1603898037225-1bea5f1c72c3?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Nothing",
    "Phone (3a) Pro",
    "nothing-phone-3a-pro",
    29999,
    ["128GB", "256GB"],
    ["Grey", "Black"],
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Motorola",
    "Edge 60 Pro",
    "motorola-edge-60-pro",
    29999,
    ["256GB", "512GB"],
    ["Dazzling Blue", "Shadow"],
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=85",
  ],
  [
    "Vivo",
    "X200",
    "vivo-x200",
    65999,
    ["256GB", "512GB"],
    ["Natural Green", "Cosmos Black"],
    "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
  ],
];
const hex = {
  Black: "#252525",
  Ultramarine: "#2c4d99",
  Navy: "#233a5a",
  Icyblue: "#b7d5e7",
  Obsidian: "#242424",
  Porcelain: "#e7e3dc",
  "Desert Titanium": "#b29a80",
  "Black Titanium": "#3a3938",
  "Titanium Black": "#414141",
  "Titanium Silverblue": "#9aa3ab",
  Hazel: "#68725d",
  "Rose Quartz": "#d4a4a6",
  "Midnight Ocean": "#183643",
  "Arctic Dawn": "#d7e2e5",
  "Mercurial Silver": "#b9b9b6",
  "Obsidian Midnight": "#1d1d1d",
  "Jade Green": "#436b5c",
  Grey: "#909090",
  "Dazzling Blue": "#2869aa",
  Shadow: "#3b3d45",
  "Natural Green": "#537e64",
  "Cosmos Black": "#202427",
};
async function main() {
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();
  for (const [brand, name, slug, base, storages, colors, image] of phones) {
    const p = await prisma.product.create({
      data: {
        brand,
        name,
        slug,
        description: `Experience ${name} with a stunning display, intelligent cameras and all-day performance. Choose the configuration that suits your life.`,
        rating: 4.4 + Math.random() * 0.5,
        reviewCount: Math.floor(180 + Math.random() * 2400),
        featured: [
          "iphone-16",
          "samsung-galaxy-s25-ultra",
          "google-pixel-9",
          "oneplus-13",
        ].includes(slug),
      },
    });
    for (let i = 0; i < 2; i++) {
      const price = base + i * 7000;
      const v = await prisma.variant.create({
        data: {
          productId: p.id,
          storage: storages[i],
          color: colors[i],
          colorHex: hex[colors[i]] || "#555",
          sku: `${slug}-${i}`,
          mrp: Math.round(price * 1.12),
          sellingPrice: price,
          image,
          images: [image],
        },
      });
      await prisma.emiPlan.createMany({
        data: [
          {
            variantId: v.id,
            provider: "No Cost EMI",
            tenure: 3,
            interestRate: 0,
            monthlyEmi: Math.ceil(price / 3),
            cashback: 0,
          },
          {
            variantId: v.id,
            provider: "HDFC Bank",
            tenure: 6,
            interestRate: 0,
            monthlyEmi: Math.ceil(price / 6),
            cashback: 1000,
            popular: true,
          },
          {
            variantId: v.id,
            provider: "ICICI Bank",
            tenure: 9,
            interestRate: 12,
            monthlyEmi: Math.ceil((price * 1.05) / 9),
            cashback: 1500,
          },
          {
            variantId: v.id,
            provider: "Bajaj Finserv",
            tenure: 12,
            interestRate: 14,
            monthlyEmi: Math.ceil((price * 1.08) / 12),
            cashback: 2000,
            processingFee: 199,
          },
        ],
      });
    }
  }
}
main()
  .then(() => console.log("Seeded 12 products"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
