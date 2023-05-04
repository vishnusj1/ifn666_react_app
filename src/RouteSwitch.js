import React from "react";
import { createBrowserRouter} from "react-router-dom";
import App from "./App";
import Profile from "./pages/Profile";
import AboutPage from "./pages/About";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />
  },
  {
    path:"/profile",
    element:<Profile />
  },
  {
    path:"/about",
    element:<AboutPage />
  },
])
export default router