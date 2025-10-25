import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 🔧 Plugin nhỏ để đổi tên file index-git.html → index.html sau khi build
    {
      name: "rename-index-html",
      closeBundle() {
        const oldPath = resolve(__dirname, "dist_git/index-git.html");
        const newPath = resolve(__dirname, "dist_git/index.html");

        if (fs.existsSync(oldPath)) {
          fs.renameSync(oldPath, newPath);
          console.log("✅ Renamed index-git.html → index.html");
        } else {
          console.warn("⚠️ File index-git.html không tồn tại trong dist_git.");
        }
      },
    },
  ],

  base: "/reactjs_words_english",
  //
  //Tiến thêm vào để giảu quyết quill
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },

    rollupOptions: {
      // input: ["src/mainGit.tsx", "./index-git.html"],
      input: {
        // index: "./index-git.html",
        index: "./index-git.html",
      },
      // input: {
      //   index: "./index_profile/index.html",
      //   src: resolve(__dirname, "src/mainProfile.tsx"),
      //   main: resolve(__dirname, "src/mainProfile.tsx"),
      //   module: resolve(__dirname, "src/mainProfile.tsx"),
      // },
      output: {
        // Output configuration for app1
        dir: resolve(__dirname, "dist_git"),
        // entryFileNames: "[name]/[name].js",
        // chunkFileNames: "[name].js",
        // assetFileNames: "[name]/assets/[name].[ext]",
      },
    },
  },
});
