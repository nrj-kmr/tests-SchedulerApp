import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';

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
          <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
          <p className="mt-4">Here you can manage your profile, settings, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;