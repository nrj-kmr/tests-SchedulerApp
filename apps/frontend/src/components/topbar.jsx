import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const { user, isUserAdmin, logout } = useContext(AuthContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(false)
  const [isAdminPanel, setIsAdminPanel] = useState(false)

  const navigate = useNavigate()
  const location = useLocation();

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };
  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

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
          <FaBars onClick={toggleSidebar} className="text-2xl cursor-pointer" />
          <span className="p-2 text-xl font-bold">Test Scheduler</span>
        </div>
      ) : (
        <span className="p-2 text-xl font-bold">Test Scheduler</span>
      )}


      <div className="flex space-x-4 relative justify-end">
        {isUserAdmin &&
          <button
            onClick={handleAdminPanel}
            className="py-1 px-2 text-xl font-bold rounded-md shadow-md bg-red-600 text-gray-100 hover:bg-red-700 hover:text-gray-100">
            {isAdminPanel ? 'User Panel' : 'Admin Panel'}
          </button>
        }
        {user && user.email ? (
          <>
            <div className="relative">
              <span
                className="flex items-center text-sm cursor-pointer p-2 rounded-md shadow-lg bg-blue-700 hover:bg-blue-800"
                onClick={toggleNotifications}
              >
                🔔 Notifications
              </span>
              {notifications && (
                <div className="absolute right-0 mt-2 w-full rounded-md shadow-md bg-gray-700 hover:bg-blue-800">
                  <div className="w-full text-left px-4 py-2 text-white">
                    No Notifications right now!
                    {/* conditionally render the notifiactions */}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <span
                className="flex items-center text-sm cursor-pointer p-2 rounded-md shadow-lg bg-blue-700 hover:bg-blue-800"
                onClick={toggleUserDropdown}
              >
                🧑🏻‍💼 {user.email}
              </span>
              {userDropdown && (
                <div className="absolute right-0 mt-2 w-auto rounded-md shadow-md bg-blue-700 hover:bg-blue-800">
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-white"
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
