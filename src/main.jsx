import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Router.jsx"; 
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import QueryProvider from "./providers/QueryProvider.jsx";
import { Toaster } from "sonner";
const theme = createTheme({
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
      <Toaster position="bottom-right" />
    </MantineProvider>
  </StrictMode>
);
