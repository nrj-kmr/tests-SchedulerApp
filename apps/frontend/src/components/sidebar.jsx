import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const Sidebar = ({ onDepartmentChange }) => {
  const { user } = useContext(AuthContext)
  const departments = ['Department 01', 'Department 02', 'Department 03', 'Department 04'];
  const [openDropdown, setOpenDropdown] = useState(null)

  const handleToggle = (title) => {
    setOpenDropdown(openDropdown === title ? null : title)
  }

  return (
    user.isAdmin === true ? (
      <div className="sidebar h-full w-64 bg-slate-700 text-white items-center flex flex-col fixed top-16 left-0 overflow-y-auto">

        <ul className='w-full list-none p-0 m-0'>

          <li title='users'>
            <h1
              onClick={() => handleToggle('users')}
              className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Users
            </h1>
            {openDropdown === 'users' && (
              <ul className="list-none p-0 pl-4 m-0">
                {/* Add Users list items here */}
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">User 1</li>
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">User 2</li>
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">User 3</li>
              </ul>
            )}
          </li>

          <li title='tests'>
            <h1
              onClick={() => handleToggle('tests')}
              className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Tests
            </h1>
            {openDropdown === 'tests' && (
              <ul className="list-none p-0 pl-4 m-0">
                {/* Add Tests list items here */}
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">Test 1</li>
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">Test 2</li>
                <li className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300">Test 3</li>
              </ul>
            )}
          </li>

          <li title='departments'>
            <h1
              onClick={() => handleToggle('departments')}
              className="p-4 text-lg cursor-pointer hover:bg-slate-600 transition-colors duration-300"
            >
              Departments
            </h1>
            {openDropdown === 'departments' && (
              <ul className="list-none p-0 pl-4 m-0">
                {departments.map(department => (
                  <li
                    key={department}
                    className="p-3 cursor-pointer hover:bg-slate-600 transition-colors duration-300"
                    onClick={() => onDepartmentChange(department)}
                  >
                    {department}
                  </li>
                ))}
              </ul>
            )}
          </li>

        </ul>

      </div>
    ) : (
      <div className="sidebar h-full w-64 bg-slate-700 text-white flex flex-col fixed top-16">
        <ul className="list-none p-0 pl-4 m-0">
          {departments.map(department => (
            <li key={department} className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => onDepartmentChange(department)}>{department}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Sidebar;