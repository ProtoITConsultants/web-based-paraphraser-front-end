import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { TermOfService } from "./pages/TermOfService";
import { Disclaimer } from "./pages/Disclaimer";
import { Settings } from "./pages/Settings";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/Login";

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
        path: "signup",
        element: <SignupForm />,
      },
      {
        path: "login",
        element: <LoginForm />,
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
