import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import path from "path";
import { Product } from "../model/product.model.js";

export const generateSitemap = async () => {
  const hostname = "https://ajfoods.lk";

  // Resolve the correct path for the backend `public` directory
  const publicDir = path.resolve("./backend/public");

  // Ensure the `public` folder exists
  if (!existsSync(publicDir)) {
    mkdirSync(publicDir, { recursive: true }); // Create the folder if it doesn't exist
  }

  // Create a SitemapStream instance
  const smStream = new SitemapStream({ hostname });

  // Static Routes
  const staticRoutes = [
    "/",
    "/all",
    "/about",
    "/support",
    "/refund-policy",
    "/privacy-policy",
    "/terms-conditions",
  ];
  staticRoutes.forEach((route) => smStream.write({ url: route }));

  // Dynamic Routes (Products)
  const products = await Product.find().select("_id");
  products.forEach((product) =>
    smStream.write({ url: `/product/${product._id}` })
  );

  // Close the stream
  smStream.end();

  // Write the sitemap to `backend/public/sitemap.xml`
  const sitemapPath = path.join(publicDir, "sitemap.xml");
  await streamToPromise(smStream).then((data) =>
    createWriteStream(sitemapPath).write(data)
  );

  console.log("Sitemap successfully generated!");
};
