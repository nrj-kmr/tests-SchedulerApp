import { FaBars } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState(false)

  const navigate = useNavigate()

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };
  const toggleNotifications = () => {
    setNotifications(!notifications)
  }

  const handleCLick = () => {
    navigate('/')
  }

  return (
    <div className="h-16 bg-slate-600 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-10 shadow-2xl">
      {!user && (
        <FaBars onClick={toggleSidebar} className="text-2xl cursor-pointer" />
      )}
      {/* <div className="flex flex-row space-x-2"> */}
        <span className="p-2 text-xl font-bold">Test Scheduler</span>
        <span className="p-2 text-xl font-bold rounded-md shadow-md">
          {user.isAdmin ? ("Admin") : ("User")}
        </span>
      {/* </div> */}
      <div className="flex space-x-4 relative">
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
                      handleCLick();
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
            onClick={handleCLick}
          >Login</button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
