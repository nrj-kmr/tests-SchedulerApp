import React from 'react';

const Sidebar = ({ onDepartmentChange }) => {
  return (
    <div className="sidebar h-full w-64 bg-slate-700 text-white flex flex-col fixed top-16">
      <ul className="flex flex-col flex-grow">
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange('Dept 01')}>Department01</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange('Dept 02')}>Department02</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange('Dept 03')}>Department03</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange('Dept 01')}>Department04</li>
      </ul>
    </div>
  );
};

export default Sidebar;