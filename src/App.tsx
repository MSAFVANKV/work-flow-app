import { Outlet, } from "react-router-dom";
import "./App.css";
import Navbar from "./components/landings/AppSidebar/Navbar";
import { AuthProvider } from "./Providers/AuthContext";


function App() {
  return (
    <div className="">
      
        {/* <div className="2xl:px-20 xl:px-10 sm:px-7 px-3 xl:py-10 py-6 max-w-screen-2xl mx-auto">
           <Routes>
         
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="*" element={<ErrorPage />} />

     
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicePage />} />

        </Routes>{" "}
        </div>
        */}
     <div className="2xl:px-20 xl:px-10 sm:px-7 px-3 xl:py-10 py-6 max-w-screen-2xl mx-auto">
    
     <AuthProvider>
     <Navbar />
       <Outlet />
     </AuthProvider>
        </div>
       
    </div>
  );
}

export default App;
