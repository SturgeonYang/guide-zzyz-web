import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Submit from "./pages/Submit";
import JoinUs from "./pages/JoinUs";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "submit", Component: Submit },
      { path: "join-us", Component: JoinUs },
    ],
  },
]);
