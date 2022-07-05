import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// import SidebarLayout from "../views/SidebarLayout";
import Login from "../views/auth/Login";
import ForgotPwd from "../views/auth/ForgotPwd";
import ResetPwd from "../views/auth/ResetPwd";
import SuspenseLoader from "../components/SuspenseLoader";
import SidebarLayout from "src/layouts/SidebarLayout";

const Loader = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

// Dashboards

const Dashboard = Loader(lazy(() => import("src/views/dashboard")));

// const SidebarLayout = Loader(lazy(() => import("src/views/SidebarLayout")));

const Hotels = Loader(lazy(() => import("src/views/applications/Hotels")));
const Rooms = Loader(lazy(() => import("src/views/applications/Rooms")));
const Customers = Loader(
  lazy(() => import("src/views/applications/Customers"))
);
const Bookings = Loader(lazy(() => import("src/views/applications/Bookings")));
const HotelRooms = Loader(
  lazy(() => import("src/views/applications/Hotels/Rooms"))
);

const CustomerBookings = Loader(
  lazy(() => import("src/views/applications/Customers/Bookings"))
);

const Moderators = Loader(lazy(() => import("src/views/moderators")));

// Status

const Status404 = Loader(lazy(() => import("../views/Status/Status404")));
const Status500 = Loader(lazy(() => import("../views/Status/Status500")));
const InvalidToken = Loader(lazy(() => import("../views/Status/InvalidToken")));
const StatusMaintenance = Loader(
  lazy(() => import("../views/Status/Maintenance"))
);

export const sessionRoutes = (isLoggedIn) => [
  {
    path: "/login",
    element: <> {isLoggedIn ? <Navigate to="/" /> : <Login />}</>,
  },
  {
    path: "/session/forgot-password",
    element: <> {isLoggedIn ? <Navigate to="/" /> : <ForgotPwd />}</>,
  },
  {
    path: "/session/reset-password",
    element: <> {isLoggedIn ? <Navigate to="/" /> : <ResetPwd />}</>,
  },
  {
    path: "/session/reset-password/invalid",
    element: <> {isLoggedIn ? <Navigate to="/" /> : <InvalidToken />}</>,
  },
];

const routes = (isLoggedIn: boolean) => [
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "moderators",
        element: <Moderators />,
      },
    ],
  },
  {
    path: "hotels",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Hotels />,
      },
      {
        path: ":hotelId/rooms",
        element: <HotelRooms />,
      },
    ],
  },
  {
    path: "customers",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Customers />,
      },
      {
        path: ":customerId/bookings",
        element: <CustomerBookings />,
      },
    ],
  },
  {
    path: "*",
    element: <Status404 />,
  },
  {
    path: "/500",
    element: <Status500 />,
  },
  {
    path: "/Maintenance",
    element: <StatusMaintenance />,
  },

  ...sessionRoutes(isLoggedIn),
];

export default routes;
