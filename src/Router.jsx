import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { TermOfService } from "./pages/TermOfService";
import { Disclaimer } from "./pages/Disclaimer";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "terms",
        element: <TermOfService />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "*",
        element: <Settings />,
      },
    ],
  },
]);
