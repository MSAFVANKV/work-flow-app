import { Navigate, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const token = Cookie.get('wf-tkn');
  const location = useLocation()

  // console.log(location.pathname,'location.pathname');
  
  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  // ✅ If the user is authenticated and tries to access the login page, redirect to the home page
  if (token && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  }


  return <>{children}</>;
};

export default AuthWrapper;
