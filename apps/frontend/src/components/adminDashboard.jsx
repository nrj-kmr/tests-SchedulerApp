import Topbar from "./topbar"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import Sidebar from "./sidebar";


const AdminDashboard = () => {
  const { isUserAdmin } = useContext(AuthContext)
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedView, setSelectedView] = useState('welcome')

  return (
    <div className="flex h-screen overflow-auto">
      <Topbar toggleSidebar={() => setSidebarVisible(!isSidebarVisible)} />
      <div className="flex flex-grow">
        <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
          <Sidebar onViewChange={(view) => setSelectedView(view)} />
        </div>

        <div className={`main-content w-full flex flex-col flex-grow ${isSidebarVisible ? 'ml-64' : ''} transition-all duration-300`}>
          <div className="flex-grow pt-16 p-6 mt-2 bg-slate-500 text-white">

            {/* Display the content here, Based on Selected View from the Sidebar. */}

            {/* WELCOME VIEW */}
            {selectedView === 'welcome' && (
              <div className='flex justify-center items-center h-full'>
                <h1 className="font-bold text-2xl">Welcome to Admin Dashboard</h1>
              </div>
            )}

            {/* VIEW USERS */}
            {selectedView === 'users' && (
              <div>
                <div className="sticky top-0 z-10">
                  <h1 className='flex flex-grow justify-center font-bold text-2xl'>Users List</h1>
                  <div className='flex justify-end mb-4'>
                    <button
                      className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
                      onClick={() => {
                        setIsUserModalOpen(true);
                      }}
                    >
                      Add User
                    </button>
                  </div>

                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
                  {users.length === 0 ? (
                    <p>No users available</p>
                  ) : (
                    <>
                      <div className="flex justify-between items-center p-2">
                        <span className="font-bold">Name</span>
                        <span className="font-bold">Email</span>
                        <span className="font-bold">Department</span>
                      </div>
                      {users.map((user) => (
                        <div key={user._id} className='flex justify-between items-center border-b border-gray-400 p-2'>
                          <span>{user.firstname} {user.lastname}</span>
                          <span>{user.email}</span>
                          <span>{user.department ? user.department : '-'}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}



          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard;