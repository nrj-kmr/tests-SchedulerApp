import React from 'react';

const DepartmentsView = ({ departments, setIsDepartmentModalOpen, handleEditDepartment }) => {
  return (
    <div>
      <div className="sticky top-0 z-0">
        <h1 className='flex flex-grow justify-center font-bold text-2xl'>Departments List</h1>
        <div className="flex justify-end mb-4">
          <button
            className='bg-blue-600 text-white px-2 py-1 rounded shadow-md hover:bg-blue-700'
            onClick={() => {
              setIsDepartmentModalOpen(true);
            }}
          >
            Add Department
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
        {departments.length === 0 ? (
          <p>No departments available</p>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b font-bold text-left">#</th>
                <th className="py-2 px-4 border-b font-bold text-left">Name</th>
                <th className="py-2 px-4 border-b font-bold text-left">Admin</th>
                <th className="py-2 px-4 border-b font-bold text-left">Description</th>
                <th className="py-2 px-4 border-b font-bold text-left"></th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={department._id}>
                  <td className="py-1 px-4 border-b border-gray-500">{index + 1}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{department.name}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{department.admin ? department.admin : '-'}</td>
                  <td className="py-1 px-4 border-b border-gray-500">{department.description ? department.description : '-'}</td>
                  <td className="py-1 px-4 border-b border-gray-500">
                    <div className="flex space-x-2 justify-end">
                      <button className='bg-green-600 text-white px-2 py-1 rounded shadow-md hover:bg-green-700' onClick={() => handleEditDepartment(department)}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DepartmentsView;