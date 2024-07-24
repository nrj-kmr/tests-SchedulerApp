import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import MyCalendar from '../components/calendarView';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`fixed ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className={`flex-grow p-6 bg-slate-500 text-white ${isSidebarVisible ? 'ml-64' : ''}`}>
          <MyCalendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;