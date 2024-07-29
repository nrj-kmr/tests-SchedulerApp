import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { AuthContext } from '../context/AuthContext';
import UserModal from './dialogModals/createUserModal';
import TestModal from './dialogModals/addTestModal';

// Set the app element for the modal
Modal.setAppElement('#root');

const AdminDashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedView, setSelectedView] = useState('welcome');
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('default');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', department: '' });
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [newTest, setNewTest] = useState({ title: '', description: '', status: '' });

  const { user } = useContext(AuthContext)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleViewChange = (view) => {
    setSelectedView(view);
  }

  const onDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const openUserModal = () => {
    console.log('opening modal');
    setIsUserModalOpen(true);
  }
  const openTestModal = () => {
    setIsTestModalOpen(true);
  }
  const handleUserInput = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }
  const handleTestInput = (e) => {
    setNewTest((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }


  if (!user) {
    return <h1>Please Login!, to access Admin Dashboard.</h1>
  }

  useEffect(() => {
    if (selectedView === 'users') {
      axios.get('http://localhost:8000/api/admin/getUsers')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    } else if (selectedView === 'tests') {
      axios.get('http://localhost:8000/api/admin/getTests')
        .then((response) => {
          setTests(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tests:', error);
        });
    }
  }, [selectedView]);

  const handleAddUser = () => {
    axios.post('http://localhost:8000/api/admin/createUser', newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setIsUserModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  }

  const handleAddTest = () => {
    axios.post('http://localhost:8000/api/admin/createTest', newTest)
      .then((response) => {
        setTests([...tests, response.data]);
        setIsTestModalOpen(false);
      })
      .catch((error) => {
        console.error('Error creating test:', error);
      });
  }

  return (
    <div className="admin-dashboard flex h-screen overflow-auto">
      <Topbar toggleSidebar={toggleSidebar} />
      <div className='flex flex-grow'>
        <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
          <Sidebar onViewChange={handleViewChange} onDepartmentChange={onDepartmentChange} />
        </div>

        <div className={`main-content w-full flex flex-col flex-grow ${isSidebarVisible ? 'ml-64' : ''} transition-all duration-300`}>
          <div className="flex-grow pt-16 p-6 mt-2 bg-slate-500 text-white">
            {selectedView === 'welcome' && (
              <div className='flex justify-center items-center h-full'>
                <h1 className='font-bold text-2xl'>Welcome to Admin Dashboard</h1>
              </div>
            )}

            {selectedView === 'users' && (
              <div>
                <div className="sticky top-0 z-10">
                  <h1 className='flex flex-grow justify-center font-bold text-2xl'>Users List</h1>
                  <div className='flex justify-end mb-4'>
                    <button
                      className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
                      onClick={openUserModal}
                    >
                      Add User
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="font-bold">Name</span>
                    <span className="font-bold">Email</span>
                    <span className="font-bold">Department</span>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
                  {users.length === 0 ? (
                    <p>No users available</p>
                  ) : (
                    <>
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

            {selectedView === 'tests' && (
              <div>
                <h1 className='flex flex-grow justify-center font-bold text-2xl'>Tests List</h1>
                <div className='flex justify-end mb-4'>
                    <button
                      className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
                      onClick={openTestModal}
                    >
                      Add Test
                    </button>
                  </div>
                <div>
                  {tests.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                      <span className='bg-orange-300 border-orange-700 border-2 p-4 w-full text-orange-800 text-center rounded-lg mt-8'>No tests available yet</span>
                    </div>
                  ) : (
                    tests.map((test) => (
                      <div key={test._id} className='flex justify-between items-center border-b border-gray-400 p-2'>
                        <span>{test.name}</span>
                        <span>{test.startTime}</span>
                        <span>{test.endTime}</span>
                        <span>{test.status}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {selectedView === 'calendar' && (
              <CalendarView department={selectedDepartment} />
            )}

          </div>
        </div>
      </div>

      <UserModal
        isOpen={isUserModalOpen}
        closeModal={() => setIsUserModalOpen(false)}
        newUser={newUser}
        handleInputChange={handleUserInput}
        handleAddUser={handleAddUser}
      />
      <TestModal
        isOpen={isTestModalOpen}
        closeModal={() => setIsTestModalOpen(false)}
        newTest={newTest}
        handleInputChange={handleTestInput}
        handleAddTest={handleAddTest}
        serNewTest={setNewTest}
      />
    </div>
  );
};

export default AdminDashboard;