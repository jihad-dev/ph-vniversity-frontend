import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import Login from "../pages/Login";
import { routeGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import PrivateRoute from "../components/layout/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role='admin'>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: (
      <PrivateRoute  role='faculty'>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <PrivateRoute role='student'>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(studentPaths),
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
