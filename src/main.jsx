import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./Router.jsx"; 
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import QueryProvider from "./providers/QueryProvider.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
const theme = createTheme({
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="975904371691-luqv775kbd24vblspsd7e4ne25uv8b4e.apps.googleusercontent.com">
      <MantineProvider theme={theme}>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
        <Toaster position="bottom-right" />
      </MantineProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
