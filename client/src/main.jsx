import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from "./Root.jsx"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
   
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
