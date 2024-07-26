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
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar onDepartmentChange={onDepartmentChange} />
      </div>
      <div className="flex flex-col flex-grow">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className={`flex-grow p-6 bg-slate-500 text-white ${isSidebarVisible ? 'ml-64' : ''}`}>
         <h1>This is Admin Dashboard</h1>
          <CalendarView department={selectedDepartment} />
          {/* {renderCalendar()} */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;