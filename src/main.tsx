import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import rootRouter from "./routers/RootRouter.tsx";

axios.defaults.baseURL = "http://localhost:3002/";
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={rootRouter} />
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
    </Provider>
  </StrictMode>
);
