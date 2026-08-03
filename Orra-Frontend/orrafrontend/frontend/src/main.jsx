import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { Toaster } from "./components/ui/sonner";
import AuthInitializer from "./components/booking/AuthInitializer";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthInitializer>
        <AppRoutes />
        <Toaster richColors position="top-right" />
      </AuthInitializer>
    </BrowserRouter>
  </Provider>,
);