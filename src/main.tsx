import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BERoute } from "./administrator/BERoute.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<BERoute />} />

        {/* <Route path="administrator/*" element={<RouteBackEnd />} /> */}
        {/* <Route path="*" element={<RouteBackEnd />} />
        <Route path="profile/:ma_nv" element={<Profile />} />
        <Route
          path="fukuda-son-dondathang/:ma_nv"  
          element={<FukudaSonDonDatHangIndex />}
        /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
