import Topbar from "./topbar"
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import Sidebar from "./sidebar";
import axios from "axios";
import Modal from 'react-modal';
import { ApiContext } from "../context/ApiContext";
import UserModal from "./dialogModals/createUserModal";
import TestModal from "./dialogModals/addTestModal";
import DepartmentModal from "./dialogModals/createDepartment";

// Set the App Element for React Modal
Modal.setAppElement('#root');

const AdminDashboard = () => {
  const { isUserAdmin } = useContext(AuthContext)
  const { users, tests, departments } = useContext(ApiContext);

  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedView, setSelectedView] = useState('welcome')

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', department: '' });
  const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });
  const [newDepartment, setNewDepartment] = useState({ name: '', admin: '' });

  if (!isUserAdmin) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className="font-bold text-2xl">You are not authorized to access this page</h1>
      </div>
    )
  }

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

            {/* USERS' VIEW */}
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

            {/* TESTS' VIEW */}
            {selectedView === 'tests' && (
              <div>
                <div className="sticky top-0 z-10">
                  <h1 className='flex flex-grow justify-center font-bold text-2xl'>Tests List</h1>
                  <div className="flex justify-end mb-4">
                    <button
                      className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
                      onClick={() => {
                        setIsTestModalOpen(true);
                      }}
                    >
                      Add Test
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
                  {tests.length === 0 ? (
                    <p>No tests available</p>
                  ) : (
                    <>
                      <div className="flex justify-between items-center p-2">
                        <span className="font-bold">Title</span>
                        <span className="font-bold">Department</span>
                        <span className="font-bold">Date</span>
                        <span className="font-bold">Start Time</span>
                        <span className="font-bold">End Time</span>
                        <span className="font-bold">Status</span>
                      </div>
                      {tests.map((test) => (
                        <div key={test._id} className='flex justify-between items-center border-b border-gray-400 p-2'>
                          <span>{test.title}</span>
                          <span>{test.department}</span>
                          <span>{test.date.split('T')[0]}</span>
                          <span>{test.startTime.split('T')[1].split('.')[0]}</span>
                          <span>{test.endTime.split('T')[1].split('.')[0]}</span>
                          <span>{test.status}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* All DEPARTMENTS' VIEW */}
            {selectedView === 'departments' && (
              <div>
                <div className="sticky top-0 z-10">
                  <h1 className='flex flex-grow justify-center font-bold text-2xl'>Departments List</h1>
                  <div className="flex justify-end mb-4">
                    <button
                      className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
                      onClick={() => {
                        setIsDepartmentModalOpen(true);
                      }}
                    >
                      Add Department
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
                  {departments.length === 0 ? (
                    <p>No departments available</p>
                  ) : (
                    <>
                      <div className="flex justify-between items-center p-2">
                        <span className="font-bold">Name</span>
                        <span className="font-bold">Admin</span>
                        <span className="font-bold">No. Employees</span>
                        <span className="font-bold">No. Scheduled Tests</span>
                      </div>
                      {departments.map((department) => (
                        <div key={department._id} className='flex justify-between items-center border-b border-gray-400 p-2'>
                          <span>{department.name}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Show Calendar Based on Selected Department */}
            {/* {console.log(selectedView)}
            {console.log(departments)}
            {departments.map((department) => () => {
              console.log(department)
            })} */}

          </div>
        </div>
      </div>

      {/* Create User Modal (pop-up box for adding users) */}
      <UserModal
        isOpen={isUserModalOpen}
        closeModal={() => setIsUserModalOpen(false)}
        newUser={newUser}
        handleInputChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
        handleAddUser={() => {
          axios.post('http://localhost:8000/api/admin/createUser', newUser)
            .then((response) => {
              console.log(response)
              setIsUserModalOpen(false);
            })
            .catch((err) => {
              console.log(err)
            })
        }}
      />

      {/* Create Test Modal (pop-up box for adding tests) */}
      <TestModal
        isOpen={isTestModalOpen}
        closeModal={() => setIsTestModalOpen(false)}
        newTest={newTest}
        handleInputChange={(e) => setNewTest({ ...newTest, [e.target.name]: e.target.value })}
        handleAddTest={async (formData) => {
          try {
            const response = axios.post('http://localhost:8000/api/admin/createTest', formData)
            console.log("Test Added", response.data)
            setIsTestModalOpen(false);

          } catch (err) {
            console.log('Error while adding new test', err)
          }
        }}
      />

      {/* Create Department Modal (pop-up box for adding departments) */}
      <DepartmentModal
        isOpen={isDepartmentModalOpen}
        closeModal={() => setIsDepartmentModalOpen(false)}
        newDepartment={newDepartment}
        handleInputChange={(e) => setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value })}
      />

    </div>
  )
}

export default AdminDashboard;