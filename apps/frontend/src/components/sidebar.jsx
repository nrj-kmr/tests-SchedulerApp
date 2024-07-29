import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Sidebar = ({ onViewChange, onDepartmentChange, }) => {
  const { user } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/getDepartments')
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error('Error fetching departments:', error));
  })

  return (
    user.isAdmin === true ? (
      <div className="sidebar h-full w-64 bg-slate-700 text-white items-center flex flex-col fixed top-16 left-0 overflow-y-auto">
        <ul className='w-full list-none p-0 m-0'>
          <li title='users'>
            <h1
              onClick={() => onViewChange('users')}
              className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Users
            </h1>
          </li>

          <li title='tests'>
            <h1
              onClick={() => onViewChange('tests')}
              className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Tests
            </h1>
          </li>

          <li title='departments'>
            <h1
              onClick={() => handleToggle('departments')}
              className='p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300'
            >
              Departments
            </h1>
            {openDropdown === 'departments' && (
              <div className="transition-colors duration-300">
                <div className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300">
                  <select name="department"
                    id="department"
                    onChange={() => { onViewChange('calendar') }}
                    className="p-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-slate-700 text-lg cursor-pointer transition-colors duration-300"
                  >
                    <option value="">--Select Department--</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department.name}
                        onClick={() => onDepartmentChange(department.name)}
                      >{department.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    ) : (
      <div className="sidebar h-full w-64 bg-slate-700 text-white flex flex-col fixed top-16">
        <ul className="list-none p-0 pl-4 m-0">
          {departments.map(department => (
            <li
              key={department._id}
              className="p-4 hover:bg-gray-700 cursor-pointer"
              onClick={() => onDepartmentChange(department.name)}>
              {department.name}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Sidebar;