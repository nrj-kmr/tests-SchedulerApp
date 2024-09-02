import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Topbar = ({ toggleSidebar, changeView }) => {
  const { user, isUserAdmin, logout } = useContext(AuthContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(false)
  const [isAdminPanel, setIsAdminPanel] = useState(false)

  const userDropdownRef = useRef(null);

  const navigate = useNavigate()
  const location = useLocation();

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };
  const handleClickOutside = (event) => {
    if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
      setUserDropdown(false);
    }
  };
  useEffect(() => {
    if (userDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userDropdown]);

  useEffect(() => {
    if (location.pathname === '/admin/dashboard') {
      setIsAdminPanel(true)
    } else {
      setIsAdminPanel(false)
    }
  }, [location.pathname])

  const handleAdminPanel = () => {
    if (isAdminPanel) {
      navigate('/dashboard')
    } else {
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="h-16 bg-slate-600 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10 shadow-2xl">
      {isAdminPanel ? (
        <div className="flex items-center justify-start">
          <div className="hover:bg-slate-700 rounded-full p-2">
            <FaBars onClick={toggleSidebar} className="text-2xl cursor-pointer" />
          </div>
          <span className="p-2 text-xl font-bold">Test Scheduler</span>
        </div>
      ) : (
        <div>
          <span className="p-2 text-xl font-bold">Test Scheduler</span>
          <span className="p-2 text-lg font-normal cursor-pointer" onClick={() => changeView('calendar')}>Calendar</span>
          <span className="p-2 text-lg font-normal cursor-pointer" onClick={() => changeView('tests')}>All tests</span>
        </div>

      )}


      <div className="flex space-x-4 relative justify-end">
        {isUserAdmin &&
          <button
            onClick={handleAdminPanel}
            className="py-1 px-2 text-lg rounded-md shadow-md bg-red-200 border border-red-100 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300">
            {isAdminPanel ? 'User Panel' : 'Admin Panel'}
          </button>
        }
        {user && user.email ? (
          <>

            <Notifications />

            <div className="relative" ref={userDropdownRef}>
              <span
                className="flex items-center text-md text-indigo-600 cursor-pointer p-2 rounded-md border border-indigo-300 bg-indigo-100 hover:bg-indigo-300 hover:text-indigo-700 transition-all duration-300"
                onClick={toggleUserDropdown}
              >
                🧑🏻‍💼 Profile
              </span>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-auto rounded-md shadow-md bg-blue-700">
                  <div className="flex flex-col items-start rounded-t-md hover:bg-blue-800">
                    <span className="m-2 text-white">{user.email}</span>
                    <hr className="border-gray-400 w-full" />
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-white hover:bg-blue-800 rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            className="flex items-center text-sm cursor-pointer p-2 rounded-md shadow-lg bg-blue-700 hover:bg-blue-800"
            onClick={() => navigate('/')}
          >Login</button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
