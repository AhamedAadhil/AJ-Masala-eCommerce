import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress", // Enable Brotli compression
      ext: ".br", // Use `.br` extension for Brotli files
    }),
    compression({
      algorithm: "gzip", // Enable Gzip compression
      ext: ".gz", // Use `.gz` extension for Gzip files
    }),
  ],
  server: {
    proxy: {
      "/api": { target: "http://localhost:5000" },
    },
  },
});
