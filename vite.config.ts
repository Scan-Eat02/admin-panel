import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from "vite-plugin-pwa";
import viteImagemin from "vite-plugin-imagemin";
import viteCompression from "vite-plugin-compression";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // Enable automatic JSX runtime (no need to import React)
    }),
    tsconfigPaths(), // Use tsconfig paths for easier module resolution
    viteImagemin({
      // Configuration for image optimization
      optipng: { optimizationLevel: 7 }, // Optimize PNG images
      jpegTran: { progressive: true }, // Enable progressive JPEGs
      svgo: {
        // SVG optimization settings
        plugins: [{ removeViewBox: false }], // Prevent removal of the viewBox attribute
      },
    }),
    viteCompression({
      // Configuration for file compression
      algorithm: "gzip", // Use gzip compression
    }),
    VitePWA({
      // Configuration for Progressive Web App (PWA) support
      registerType: "autoUpdate", // Automatically update service worker
      // includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"], // Assets to include in the PWA
      // manifest: {
      //   name: "My Large React App", // PWA name
      //   short_name: "ReactApp", // Short name for the PWA
      //   description: "A modern React application with Vite", // Description for the PWA
      //   theme_color: "#ffffff", // Theme color for the PWA
      //   icons: [ // PWA icons
      //     {
      //       src: "pwa-192x192.png", // Icon source
      //       sizes: "192x192", // Icon size
      //       type: "image/png", // Icon type
      //     },
      //     {
      //       src: "pwa-512x512.png", // Icon source
      //       sizes: "512x512", // Icon size
      //       type: "image/png", // Icon type
      //     },
      //   ],
      // },
    }),
  ],
  resolve: {
    // Resolve module aliases for easier imports
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(), // Automatically add vendor prefixes to CSS
      ],
    },
  },
  build: {
    // Build configuration
    target: "esnext",
    sourcemap: true, // Generate source maps for easier debugging
    cssCodeSplit: true, // Split CSS into separate files
    minify: "esbuild", // Use esbuild for minification
    rollupOptions: {
      // Rollup configuration options
      output: {
        manualChunks(id) {
          // Custom manual chunking for better performance
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString(); // Create chunks for each module in node_modules
          }
        },
      },
    },
  },
  server: {
    // Development server configuration
    port: 3001, // Server port
    open: true, // Automatically open the app in the browser
    hmr: {
      overlay: true, // Show overlay for Hot Module Replacement errors
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle dependencies for faster startup
  },
});
