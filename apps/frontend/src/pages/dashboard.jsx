import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import CalendarView from '../components/calendarComponents/calendarView';
import { Department01, Department02, Department03, Department04 } from '../components/calendarComponents/Departments';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('default');

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const onDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  // const renderCalendar = () => {
  //   switch (selectedDepartment) {
  //     case 'Dept 01':
  //       return <Department01 selectedDepartment={selectedDepartment} events={events} />;
  //     case 'Dept 02':
  //       return <Department02 selectedDepartment={selectedDepartment} events={events} />;
  //     case 'Dept 03':
  //       return <Department03 selectedDepartment={selectedDepartment} events={events} />;
  //     case 'Dept 04':
  //       return <Department04 selectedDepartment={selectedDepartment} events={events} />;
  //     default:
  //       return <CalendarView />;
  //   }
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar onDepartmentChange={onDepartmentChange} />
      </div>
      <div className="flex flex-col flex-grow">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className={`flex-grow p-6 bg-slate-500 text-white ${isSidebarVisible ? 'ml-64' : ''}`}>
          <CalendarView department={selectedDepartment} />
          {/* {renderCalendar()} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;