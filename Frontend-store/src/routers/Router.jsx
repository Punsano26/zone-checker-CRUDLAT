import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import Layout from "../layouts/Layout";
// import Home from "../page/Home";
const Home = lazy(() => import("../page/Home"));
// import Addbook from "../page/Addbook";
const AddLocation  = lazy(() => import("../page/AddLocation"));
// import Login from "../page/Login";
const Login = lazy(() => import("../page/Login"));
// import Register from "../page/Register";
const Register = lazy(() => import("../page/Register"));
// import Editbook from "../page/Editbook";
const EditLocation = lazy(() => import("../page/EditLocation"));
const Userprofile = lazy(() => import("../page/Userprofile"));
const EditStore = lazy(() => import("../page/EditStore"));
const EditModal = lazy(() => import("../components/EditModal"));

import NotAllowed from "../page/NotAllowed";
import ModOrAdminPage from "../page/ModOrAdminPage";
import AdminPage from "../page/AdminPage";
import RegisterPotected from "../page/RegisterPotection";



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
        element:(
          <RegisterPotected>
            <Register />
          </RegisterPotected>
          ),
      },
      {
        path: "add",
        element: (
          <AdminPage>
            <AddLocation />
          </AdminPage>
        ),
      },
      {
        path: "edit/:storeID",
        element: (
          <ModOrAdminPage>
            <EditLocation />
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
      {
        path: "editstore",
        element: <EditStore />,
      },
      {
        path: "editmodal/:storeID",
        element: <EditModal />,
      }
    ],
  },
]);

export default router;
