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
import { TranslatorWrapper } from "./pages/TranslatorWrapper";
import Paraphraser from "./pages/Paraphraser";
import Summarizer from "./pages/Summarizer";

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
        path: "/AI-translation/",
        element: <TranslatorWrapper />,
      },
      {
        path: "/AI-translation/:slug",
        element: <TranslatorWrapper />,
      },
      {
        path: "/AI-paraphrasing-tool/",
        element: <Paraphraser />,
      },
      {
        path: "/AI-generated-summaries/",
        element: <Summarizer />,
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
