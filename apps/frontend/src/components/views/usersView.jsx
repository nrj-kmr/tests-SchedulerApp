import React from 'react';

const UsersView = ({ users, setIsUserModalOpen, handleEditUser }) => {
  return (
     <div>
     <div className="sticky top-0 z-0">
       <h1 className='flex flex-grow justify-center font-bold text-2xl mb-2'>Users List</h1>
       <div className='flex justify-end mb-4'>
         <button
           className='bg-indigo-200 text-indigo-600 px-2 py-1 rounded border border-indigo-100 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-300'
           onClick={() => {
             setIsUserModalOpen(true);
           }}
         >
           + Add User
         </button>
       </div>

     </div>
     <div className="overflow-y-auto max-h-[calc(100vh-200px)] bg-slate-600 rounded-lg">
       {users.length === 0 ? (
         <p>No users available</p>
       ) : (
         <table className="min-w-full">
           <thead>
             <tr>
               <th className="py-2 px-4 border-b font-bold text-left">#</th>
               <th className="py-2 px-4 border-b font-bold text-left">Name</th>
               <th className="py-2 px-4 border-b font-bold text-left">Email</th>
               <th className="py-2 px-4 border-b font-bold text-left">Department</th>
               <th className="py-2 px-4 border-b font-bold text-left">Role</th>
               <th className="py-2 px-4 border-b font-bold text-left"></th>
             </tr>
           </thead>
           <tbody>
             {users.map((user, index) => (
               <tr key={user._id}>
                 <td className="py-1 px-4 border-b border-gray-500">{index + 1}</td>
                 <td className="py-1 px-4 border-b border-gray-500">{user.firstname} {user.lastname}</td>
                 <td className="py-1 px-4 border-b border-gray-500">{user.email}</td>
                 <td className="py-1 px-4 border-b border-gray-500">{user.department ? user.department : '-'}</td>
                 <td className="py-1 px-4 border-b border-gray-500">{user.isAdmin ? 'Admin' : 'User'}</td>
                 <td className="py-1 px-4 border-b border-gray-500">
                   <div className="flex space-x-2 justify-center">
                     <button className='bg-green-200 text-green-600 px-2 py-1 rounded shadow-md border border-green-100 hover:bg-green-100 hover:text-green-700 transition-all duration-300' onClick={() => handleEditUser(user)}>✎ Edit</button>
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

export default UsersView;