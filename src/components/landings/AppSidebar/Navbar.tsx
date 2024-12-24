import Logo from '@/components/logo/Logo';
import { useAuth } from '@/Providers/AuthContext';
import { useAppSelector } from '@/redux/hook';
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

export default function Navbar() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const {logout} = useAuth()
  const location = useLocation();

    const {
    email,
  
  } = user || {};
  // Define pages with id, name, and url
  const pages = [
    { id: 1, name: 'Home', url: '/' },
    { id: 2, name: 'About', url: '/about' },
    { id: 3, name: 'Services', url: '/services' },
    { id: 4, name: 'Contact', url: '/contact' }
  ];

  return (
    <header className="flex justify-between items-center p-2 bg-gray-800 text-white">
      {/* Left: Logo */}
      <div className="flex-shrink-0">
       <Logo />
      </div>

      {/* Middle: Links */}
      <nav className="md:flex hidden space-x-6">
        {pages.map((page) => (
          <Link 
            key={page.id} 
            to={page.url} 
            className={`hover:text-gray-400 ${location.pathname === page.url ? "underline underline-offset-4":""}`}
          >
            {page.name}
          </Link>
        ))}
      </nav>

      {/* Right: Login Button */}
      <div>
        {
          isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-white text-xs ">{email}</span>
              <Link to={`/logout`} className="text-gray-500 hover:text-gray-400"
              onClick={logout}
              >
                Logout
              </Link>
            </div>
          ):(
             <Link to={`/login`} className="bg-white text-black px-4 py-2 rounded-sm hover:bg-gray-50 shadow">
          Login
        </Link>
          )
        }
       
      </div>
    </header>
  );
}
