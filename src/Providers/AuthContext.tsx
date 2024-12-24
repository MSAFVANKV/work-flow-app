// src/context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@/redux/hook';
import { fetchUserDetails, logoutSuccess } from '@/redux/UserAuthSlice';
import axios from 'axios';
import { userLogout } from '@/url/urlPath';
import { makeToast } from '@/utils/toaster';
import { useNavigate } from 'react-router-dom';


// ✅ Define the type for AuthContext
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// ✅ Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Define the Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// ✅ AuthProvider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate  = useNavigate();

  useEffect(() => {
    const savedToken = Cookies.get('wf-tkn');
    if (savedToken) {
      setToken(savedToken);
      dispatch(fetchUserDetails())
    }
  }, []);

  const logout = async () => {
    try {
      Cookies.remove('wf-tkn');
      setToken(null);
      const response = await axios.post(
        userLogout,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        // Cookies.remove("user-token");
        navigate("/login");
        // window.location.reload();
        dispatch(logoutSuccess());
        makeToast("Successfully LoggedOut, Stay with us for new Trends");
      } else {
        console.error("Failed to log out");
      }
    } catch (error:any) {
      console.error("Error occurred while logging out:", error);
      makeToast("Failed to log out, Stay with us for new Trends");
      
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to Use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
