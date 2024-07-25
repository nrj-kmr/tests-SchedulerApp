import React from 'react';

const Sidebar = ({ onDepartmentChange }) => {
  const departments = ['Department 01', 'Department 02', 'Department 03', 'Department 04'];

  return (
    <div className="sidebar h-full w-64 bg-slate-700 text-white flex flex-col fixed top-16">
      <ul className="flex flex-col flex-grow">
        {departments.map(department => (
          <li key={department} className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange(department)}>{department}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;