import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Home/home-page";
import Navbar from "./components/landings/AppSidebar/Navbar";
import LoginPage from "./Pages/Login/login-page";
import AuthWrapper from "./Providers/AuthWrapper";
import ErrorPage from "./Pages/Error/error-page";
import ServicePage from "./Pages/service/service-page";

function App() {
  return (
    <div className="">
      <Navbar />
      <AuthWrapper>
        <div className="2xl:px-20 xl:px-10 sm:px-7 px-3 xl:py-10 py-6 max-w-screen-2xl mx-auto">
           <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Protected Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />} />

        </Routes>{" "}
        </div>
       
      </AuthWrapper>
    </div>
  );
}

export default App;
