import App from "@/App";
import HomePage from "@/Pages/Home/home-page";
import LoginPage from "@/Pages/Login/login-page";
import ServicePage from "@/Pages/service/service-page";
import AuthWrapper from "@/Providers/AuthWrapper";
import { createBrowserRouter } from "react-router-dom";


const rootRouter = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: (
            <AuthWrapper>
                <App/>
            </AuthWrapper>
        ),
        children:[
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/services",
                element: <ServicePage />
            }
        ]
      }
]);

export default rootRouter;
