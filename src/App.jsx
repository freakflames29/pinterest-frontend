import { useState } from "react";

import "./App.css";
import { useEffect } from "react";

import { useRef } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import Nav from "./components/Nav";
import SinglePin from "./components/SinglePin";
import Profile from "./components/Profile.jsx";
import UserBoard from "./components/UserBoard.jsx";
import Create from "./components/Create.jsx";
import SavedPins from "./components/SavedPins.jsx";
import CreatedPins from "./components/CreatedPins.jsx";

function App() {


  //
  //
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "pin/:id",
          element: <SinglePin />,
        },
        {
          path: "profile/",
          element: <Profile />,
          children:[
            {
              path:"saved/",
              element: <SavedPins/> //TODO:ADD SAVED COPONENT
            },
            {
              path:"created/",
              element:<CreatedPins/>
            }
          ]
        },
        {
          path: "board/:boardId/",
          element: <UserBoard />,
        },{
          path: "create/",
          element: <Create />,
        },
      ],
    },
    {
      path: "/auth",
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
