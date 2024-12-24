import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./Providers/AuthContext.tsx";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";

axios.defaults.baseURL = "http://localhost:3002/";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{
              duration: 2000,
            }}
            containerStyle={{
              zIndex: "100009",
            }}
            gutter={14}
          />

          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
