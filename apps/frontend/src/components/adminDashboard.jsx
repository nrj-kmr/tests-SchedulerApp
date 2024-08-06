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
import CalendarView from "./calendarComponents/calendarView";
import EditUserModal from "./dialogModals/editUserModal";
import TestEditModal from "./dialogModals/editTestModal";
import EditDepartmentModal from "./dialogModals/editDepartment";
import TestsView from "./views/testsView";
import DepartmentsView from "./views/departments";

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

  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', department: '', role: '' });
  const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });
  const [newDepartment, setNewDepartment] = useState({ name: '', admin: '' });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);
  const [isTestEditModalOpen, setIsTestEditModalOpen] = useState(false);
  const [isDepartmentEditModalOpen, setIsDepartmentEditModalOpen] = useState(false);

  if (!isUserAdmin) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <h1 className="font-bold text-2xl">You are not authorized to access this page</h1>
      </div>
    )
  }

  const handleUserOptions = (user) => {
    setSelectedUser(user);
    setIsUserOptionsOpen(true);
  }
  const handleCloseDialog = () => {
    setIsUserOptionsOpen(false);
    setSelectedUser(null);
  }

  const handleSaveUser = (updatedUser) => {
    if (updatedUser.role === 'Admin') {
      updatedUser.isAdmin = true;
    } else {
      updatedUser.isAdmin = false;
    }
    axios.put(`http://localhost:8000/api/admin/editUser/${updatedUser._id}`, updatedUser)
      .then((response) => {
        console.log("User updated successfully:", response.data);
        handleCloseDialog();
      })
      .catch((err) => {
        console.log('Error while updating user:', err);
        handleCloseDialog();
      })
    handleCloseDialog();
  }

  const handleEditTest = (test) => {
    setSelectedTest(test);
    setIsTestEditModalOpen(true);
  }
  const handleCloseTestEditModal = () => {
    setIsTestEditModalOpen(false);
    setSelectedTest(null);
  }
  const handleUpdateTest = (updatedTest) => {
    axios.put(`http://localhost:8000/api/admin/editTest/${updatedTest._id}`, updatedTest)
      .then((response) => {
        console.log("Test updated successfully:", response.data);
        handleCloseTestEditModal();
      })
      .catch((err) => {
        console.log('Error while updating test:', err);
        handleCloseTestEditModal();
      })
    handleCloseTestEditModal();
  }

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentEditModalOpen(true);
  }

  const handleCloseDepartmentEditModal = () => {
    setIsDepartmentEditModalOpen(false);
    setSelectedDepartment(null);
  }

  const handleUpdateDepartment = (updatedDepartment) => {
    axios.put(`http://localhost:8000/api/admin/editDepartment/${updatedDepartment._id}`, updatedDepartment)
      .then((response) => {
        console.log("Department updated successfully:", response.data);
        handleCloseDepartmentEditModal();
      })
      .catch((err) => {
        console.log('Error while updating department:', err);
        handleCloseDepartmentEditModal();
      })
    handleCloseDepartmentEditModal();
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
                <div className="sticky top-0 z-0">
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
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b font-bold text-left">#</th>
                          <th className="py-2 px-4 border-b font-bold text-left">Name</th>
                          <th className="py-2 px-4 border-b font-bold text-left">Email</th>
                          <th className="py-2 px-4 border-b font-bold text-left">Department</th>
                          <th className="py-2 px-4 border-b font-bold text-left">Role</th>
                          <th className="py-2 px-4 border-b font-bold text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={user._id}>
                            <td className="py-1 px-4 border-b border-gray-500">{index + 1}</td>
                            <td className="py-1 px-4 border-b border-gray-500">{user.firstname} {user.lastname}</td>
                            <td className="py-1 px-4 border-b border-gray-500">{user.email}</td>
                            <td className="py-1 px-4 border-b border-gray-500">{user.department ? user.department : '-'}</td>
                            <td className="py-1 px-4 border-b border-gray-500">{user.isAdmin ? 'Admin' : 'User'}</td>
                            <td className="py-1 px-4 border-b border-gray-500">
                              <div className="flex space-x-2 justify-center">
                                <button className='bg-green-600 text-white px-2 py-1 rounded shadow-md hover:opacity-50' onClick={() => handleUserOptions(user)}>Edit</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* TESTS' VIEW */}
            {selectedView === 'tests' && (
              <TestsView tests={tests} setIsTestModalOpen={setIsTestModalOpen} handleEditTest={handleEditTest} />
            )}

            {/* All DEPARTMENTS' VIEW */}
            {selectedView === 'departments' && (
              <DepartmentsView
                departments={departments}
                setIsDepartmentModalOpen={setIsDepartmentModalOpen}
                handleEditDepartment={handleEditDepartment}
              />
            )}

            {/* Show Calendar Based on Selected Department */}
            {(departments || []).map((department) => {
              if (department.name.includes(selectedView)) {
                return (
                  <CalendarView
                    key={department._id}
                    department={selectedView}
                    actualUserDept={selectedView}
                  />
                )
              }
              return null;
            })}

          </div>
        </div>
      </div>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isUserOptionsOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveUser}
        />
      )}

      {selectedTest && (
        <TestEditModal
          test={selectedTest}
          isOpen={isTestEditModalOpen}
          onClose={handleCloseTestEditModal}
          onSave={handleUpdateTest}
        />
      )}

      {selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          isOpen={isDepartmentEditModalOpen}
          onClose={handleCloseDepartmentEditModal}
          onSave={handleUpdateDepartment}
        />
      )}

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
        handleAddDepartment={() => {
          axios.post('http://localhost:8000/api/admin/createDepartment', newDepartment)
            .then((response) => {
              console.log(response)
              setIsDepartmentModalOpen(false);
            })
            .catch((err) => {
              console.log(err)
            })
        }}
      />

    </div>
  )
}

export default AdminDashboard;