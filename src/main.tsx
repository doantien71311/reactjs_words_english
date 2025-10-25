// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import { BERoute } from "./administrator/BERoute.tsx";
// import { EnglishDisplayIndex } from "./administrator/componments/word_english_display/EnglishDisplayIndex.tsx";
import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

createRoot(document.getElementById("root")!).render(
  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<App />}></Route>
  //     <Route path="*" element={<BERoute />} />

  //     {/* <Route path="administrator/*" element={<RouteBackEnd />} /> */}
  //     {/* <Route path="*" element={<RouteBackEnd />} />
  //       <Route path="profile/:ma_nv" element={<Profile />} />
  //       <Route
  //         path="fukuda-son-dondathang/:ma_nv"
  //         element={<FukudaSonDonDatHangIndex />}
  //       /> */}
  //   </Routes>
  // </BrowserRouter>

  <BrowserRouter basename="wordsenglish">
    <Routes>
      <Route path="/" element={<App />}></Route>
      {/* <Route path="/" index element={<EnglishDisplayIndex />} /> */}
      <Route path="*" element={<BERoute />} />
    </Routes>
  </BrowserRouter>
);
