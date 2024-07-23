// src/components/Topbar.jsx
import React from 'react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <div className="h-16 bg-blue-600 text-white flex items-center justify-between px-4">
      <div className="text-xl font-bold cursor-pointer" onClick={toggleSidebar}>
        Test Scheduler
      </div>
      <div className="space-x-4">
        <button className="bg-blue-700 p-2 rounded-xl">Notifications</button>
        <button className="bg-blue-700 p-2 rounded-xl">Profile</button>
      </div>
    </div>
  );
};

export default Topbar;
