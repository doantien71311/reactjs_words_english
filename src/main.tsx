// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import { BERoute } from "./administrator/BERoute.tsx";
// import { EnglishDisplayIndex } from "./administrator/componments/word_english_display/EnglishDisplayIndex.tsx";
import App from "./App.tsx";
import BEUrl from "./administrator/BEUrl.tsx";
import { EnglishDisplayIndex } from "./administrator/componments/word_english_display/EnglishDisplayIndex.tsx";

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

  <BrowserRouter>
    <Routes>
      <Route path="/app" element={<App />}></Route>
      {/* "/" sẽ hiển thị EnglishDisplayIndex */}
      <Route path="/" element={<EnglishDisplayIndex />} />

      <Route
        path="/administrator/word-english-display"
        element={<EnglishDisplayIndex />}
      />
      <Route
        path={BEUrl.administrator_word_english_display + BEUrl.toQueryKeyAddNew}
        element={<EnglishDisplayIndex />}
      />
      <Route path="*" element={<BERoute />} />
    </Routes>
  </BrowserRouter>
);
