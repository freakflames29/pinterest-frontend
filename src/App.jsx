import { useState } from "react";

import "./App.css";
import { useEffect } from "react";

import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Nav from "./components/Nav";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "auth/",
      element: <Auth />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
