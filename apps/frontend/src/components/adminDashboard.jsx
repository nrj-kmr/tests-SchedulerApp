import { useContext, useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { Department01, Department02, Department03, Department04 } from '../components/calendarComponents/Departments';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('default');

  const { user } = useContext(AuthContext)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  if (!user) {
    return <h1>Please Login!</h1>
  }

  return (
    <div className="flex h-screen overflow-auto">
      <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar onDepartmentChange={onDepartmentChange} />
      </div>
      <div className={`flex flex-col flex-grow ${isSidebarVisible ? 'ml-64' : ''} transition-all duration-300`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="flex-grow pt-16 p-6 bg-slate-500 text-white">
          <h1 className="bg-gray-700 mt-3 mb-2 text-center font-bold text-2xl p-2 rounded shadow-md">Admin Dashboard</h1>
          <CalendarView department={selectedDepartment} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;