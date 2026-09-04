import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import catalogRoutes from "./routes/catalog.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/products", productRoutes);
app.use("/api", catalogRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
if (process.env.VERCEL !== "1") {
  app.listen(process.env.PORT || 4000, () =>
    console.log(`API running on port ${process.env.PORT || 4000}`),
  );
}
