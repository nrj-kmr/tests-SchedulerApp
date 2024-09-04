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
import EditDepartmentModal from "./dialogModals/editDepartment";
import TestsView from "./views/testsView";
import DepartmentsView from "./views/departments";
import UsersView from "./views/usersView";
import EditTestModal from "./dialogModals/editTestModal";

import { serverURL, updateTest } from '../services/apiServices'

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

  const [successMessage, setSuccessMessage] = useState('')

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
    console.log('Updated User:', updatedUser);
    axios.put(`${serverURL}/api/admin/editUser/${updatedUser._id}`, updatedUser)
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
    setSelectedTest(null);
    setIsTestEditModalOpen(false);
  }
  const handleUpdateTest = (updatedTest) => {
    updateTest(updatedTest._id, updatedTest)
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
    axios.put(`${serverURL}/api/admin/editDepartment/${updatedDepartment._id}`, updatedDepartment)
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
              <UsersView
                users={users}
                setIsUserModalOpen={setIsUserModalOpen}
                handleEditUser={handleUserOptions}
              />
            )}

            {/* SUCCESS MESSAGE */}
            {successMessage && (
              <div className='fixed inset-x-0 bottom-0 mx-auto mb-20 w-1/4 border border-red-400 bg-red-200 py-2 rounded-lg'>
                <button onClick={() => setSuccessMessage('')} className="absolute top-0 right-0 text-red-500 font-bold px-2">&times;</button>
                <p className='text-red-500 text-center'>{successMessage}</p>
              </div>
            )}

            {/* TESTS' VIEW */}
            {selectedView === 'tests' && (
              <TestsView
                tests={tests}
                setIsTestModalOpen={setIsTestModalOpen}
                handleEditTest={handleEditTest}
              />
            )}

            {/* All DEPARTMENTS' VIEW */}
            {selectedView === 'departments' && (
              <DepartmentsView departments={departments} setIsDepartmentModalOpen={setIsDepartmentModalOpen} handleEditDepartment={handleEditDepartment} />
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
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {selectedTest && (
        <EditTestModal
          test={selectedTest}
          isOpen={isTestEditModalOpen}
          onClose={handleCloseTestEditModal}
          onSave={handleUpdateTest}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          isOpen={isDepartmentEditModalOpen}
          onClose={handleCloseDepartmentEditModal}
          onSave={handleUpdateDepartment}
          setSuccessMessage={setSuccessMessage}
        />
      )}

      {/* Create User Modal (pop-up box for adding users) */}
      <UserModal
        isOpen={isUserModalOpen}
        closeModal={() => setIsUserModalOpen(false)}
        newUser={newUser}
        handleInputChange={(e) => setNewUser({ ...newUser, [e.target.name]: e.target.value })}
        handleAddUser={() => {
          axios.post(`${serverURL}/api/admin/createUser`, newUser)
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
            const response = axios.post(`${serverURL}/api/admin/createTest`, formData)
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
          axios.post(`${serverURL}/api/admin/createDepartment`, newDepartment)
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