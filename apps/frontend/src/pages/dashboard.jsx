import { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { Department01, Department02, Department03, Department04 } from '../components/calendarComponents/Departments';
import { AuthContext } from '../context/AuthContext';
import { AdminDashboard, UserDashboard } from '../components';
import { useNavigate } from 'react-router-dom';
import Home from './home';
useNavigate

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
        <h1 className='text-center'>Please Login! to continue</h1>
        <span className='cursor-pointer underline' onClick={handleLogin}>Login</span>
      </div>      
    )
  }

  return (
    // <div className="flex h-screen overflow-hidden">
    //   <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
    //     <Sidebar onDepartmentChange={onDepartmentChange} />
    //   </div>
    //   <div className="flex flex-col flex-grow">
    //     <Topbar toggleSidebar={toggleSidebar} />
    //     <div className={`flex-grow p-6 bg-slate-500 text-white ${isSidebarVisible ? 'ml-64' : ''}`}>
    //       <CalendarView department={selectedDepartment} />
    //       {/* {renderCalendar()} */}
    //     </div>
    //   </div>
    // </div>
    <AdminDashboard />
    // user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
  );
};

export default Dashboard;