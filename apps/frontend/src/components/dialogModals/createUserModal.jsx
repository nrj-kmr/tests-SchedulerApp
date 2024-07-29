import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const UserModal = ({ isOpen, closeModal, newUser, handleInputChange, handleAddUser }) => {
   const [passwordVisible, setPasswordVisible] = useState(false);
   const [departments, setDepartments] = useState([]);

   const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
   }

   useEffect(() => {
      axios.get('http://localhost:8000/api/admin/getDepartments')
          .then((response) => setDepartments(response.data))
          .catch((error) => console.error('Error fetching departments:', error));
  }, []);

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={closeModal}
         contentLabel='Add User'
         className='fixed inset-0 flex justify-center items-center z-50'
         overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
      >
         <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <button className='absolute top-2 right-4 text-gray-500 hover:text-gray-700' onClick={closeModal}>&times;</button>

            <h2 className='text-2xl font-bold mb-6 text-center'>Add User</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }} className='space-y-4'>

               <div className="flex flex-row space-x-2 mb-4">
                  <label className='block'>
                     {/* <span className='text-gray-700'>First Name:</span> */}
                     <input type='text' name='firstname' placeholder='First Name' value={newUser.firstname} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                  </label>
                  <label className='block'>
                     {/* <span className='text-gray-700'>Last Name:</span> */}
                     <input type='text' name='lastname' placeholder='Last Name' value={newUser.lastname} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                  </label>
               </div>

               <label className='block'>
                  {/* <span className='text-gray-700'>Email:</span> */}
                  <input type='email' name='email' placeholder='Email' value={newUser.email} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
               </label>

               <label className='block'>
                  {/* <span className='text-gray-700'>Password:</span> */}
                  <div className='relative'>
                     <input type={passwordVisible ? 'text' : 'password'}
                        name='password' placeholder='Password'
                        value={newUser.password} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                     <button type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute inset-y-0 right-0 px-3 py-3 text-sm font-medium text-gray-400'
                     >
                        {passwordVisible ? '🙈 Hide' : '👁️ Show'}
                     </button>
                  </div>
               </label>

               <label className='block'>
                  <select name="department"
                     value={newUser.department}
                     onChange={handleInputChange}
                     required
                     className="p-2 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                     <option value="">--Select Department--</option>
                     {departments.map((department) => (
                        <option key={department._id} value={department.name}
                        >{department.name}</option>
                     ))}
                  </select>
               </label>
               <div className='flex justify-end space-x-4'>
                  <button type='button' onClick={closeModal} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'>
                     Cancel
                  </button>
                  <button type='submit' className='px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                     Add User
                  </button>
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default UserModal;