import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "./components/login"
import { Main } from "./components/main"
import { Score } from "./components/score"
import { UserDetailsProvider } from "./context/UserDetailsContext"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <UserDetailsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </UserDetailsProvider>
  </React.StrictMode>
)
