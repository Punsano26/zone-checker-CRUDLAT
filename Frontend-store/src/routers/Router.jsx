import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layouts/Layout";
// import Home from "../page/Home";
const Home = lazy(() => import("../page/Home"));
// import Addbook from "../page/Addbook";
const Addbook = lazy(() => import("../page/Addbook"));
// import Login from "../page/Login";
const Login = lazy(() => import("../page/Login"));
// import Register from "../page/Register";
const Register = lazy(() => import("../page/Register"));
// import Editbook from "../page/Editbook";
const Editbook = lazy(() => import("../page/Editbook"));
const Userprofile = lazy(() => import("../page/Userprofile"));

import NotAllowed from "../page/NotAllowed";
import ModOrAdminPage from "../page/ModOrAdminPage";
import AdminPage from "../page/AdminPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add",
        element: (
          <AdminPage>
            <Addbook />
          </AdminPage>
        ),
      },
      {
        path: "edit/:bookID",
        element: (
          <ModOrAdminPage>
            <Editbook />
          </ModOrAdminPage>
        ),
      },
      {
        path: "not-allowed",
        element: <NotAllowed />,
      },
      {
        path: "userprofile",
        element: <Userprofile />,
      },
    ],
  },
]);

export default router;
