import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Main } from "./components/Main";
import { Score } from "./components/Score";
import { SavedGames } from "./components/SavedGames";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import "./index.css";

//fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fab, fas, far); //A registration process to make it easier to call from other components?

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserDetailsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/score" element={<Score />} />
          <Route path="/savedgames" element={<SavedGames />} />
        </Routes>
      </BrowserRouter>
    </UserDetailsProvider>
  </React.StrictMode>
);
