import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AdminDashboard, UserDashboard } from '../components';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('default');

  const navigate = useNavigate();
  const handleLogin = () => {
      navigate('/');
  }

  const { user } = useContext(AuthContext)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  if (!user) {
    return (
      <div className='flex space-x-2 h-screen overflow-hidden justify-center items-center bg-slate-600 text-white text-2xl font-bold'>
        <h1 className='text-center'>Please <span className='cursor-pointer underline' onClick={handleLogin}>Login</span> to continue</h1>
      </div>      
    )
  }

  return (
    user.isAdmin === true ? <AdminDashboard /> : <UserDashboard />
  );
};

export default Dashboard;