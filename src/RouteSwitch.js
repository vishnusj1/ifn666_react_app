import React from "react";
import { createBrowserRouter} from "react-router-dom";
import App from "./App";
import Profile from "./pages/Profile";
import AboutPage from "./pages/About";
import Stock from "./pages/Stocks";
import ResultsPage from "./pages/ResultsPage";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/login",
    element: <Login />
  },
  {
    path:"/profile",
    element:<Profile />
  },
  {
    path:"/stock",
    element:<Stock />
  },
  {
    path:"/stocks/:symbol",
    element:<ResultsPage />
  },
  {
    path:"/about",
    element:<AboutPage />
  },
])
export default router