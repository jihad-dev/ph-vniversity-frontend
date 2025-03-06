import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import {  adminPaths } from "./admin.routes";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routesGenerator";

const router   = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths) ,
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);


export default router;
