import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import { Privacy } from "./pages/Privacy";
import { TermOfService } from "./pages/TermOfService";
import { Disclaimer } from "./pages/Disclaimer";
import { Settings } from "./pages/Settings";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/Login";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Translator from "./pages/Translator";

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
        path: "/translator",
        element: <Translator />,
      },
      {
        path: "/paraphraser",
        element: <Home />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:slug",
        element: <BlogPost />,
      },
      {
        path: "/blog/:slug",
        element: <BlogPost />,
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
