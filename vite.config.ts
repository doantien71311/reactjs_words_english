import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import basicSsl from "@vitejs/plugin-basic-ssl"; // For a basic self-signed certificate
// import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  // server: {
  //   https: "true", // Enable HTTPS
  // },
});
