import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { Score } from "./components/score";
import { Main } from "./components/main";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
