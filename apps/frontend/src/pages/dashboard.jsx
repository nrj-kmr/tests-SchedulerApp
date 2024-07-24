import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarView';
import Department01 from '../components/department01';
import Department02 from '../components/department02';
import Department03 from '../components/department03';
import Department04 from '../components/department04';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('default');

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const renderCalendar = () => {
    switch (selectedDepartment) {
      case 'dept 01':
        return <Department01 />; // Replace this with the component for the department
      case 'dept 02':
        return <Department02 />; // Replace this with the component for the department
      case 'dept 03':
        return <Department03 />; // Replace this with the component for the department
      case 'dept 04':
        return <Department04 />; // Replace this with the component for the department
      default:
        return <CalendarView />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar onDepartmentChange={onDepartmentChange} />
      </div>
      <div className="flex flex-col flex-grow">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className={`flex-grow p-6 bg-slate-500 text-white ${isSidebarVisible ? 'ml-64' : ''}`}>
          {renderCalendar()}
          {/* <CalendarView department={selectedDepartment} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;