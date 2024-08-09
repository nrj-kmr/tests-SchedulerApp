import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const DepartmentModal = ({ isOpen, closeModal, newDepartment, handleInputChange, handleAddDepartment }) => {

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={closeModal}
         contentLabel='Add Test'
         className='fixed inset-0 flex justify-center items-center z-50'
         overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
      >
         <div className='relative bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <button className='absolute top-2 right-2 rounded-full px-2 hover:bg-gray-200 text-gray-600 text-xl hover:text-gray-800 transition-all duration-300' onClick={closeModal}>&times;</button>

            <h2 className='text-2xl font-bold mb-6 text-center'>Add Department</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddDepartment(); }}>
               <div className='flex flex-col space-y-4'>
                  <label className='block'>
                     <input
                        type='text'
                        name='name'
                        value={newDepartment.name}
                        placeholder='Enter Department name'
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     />
                  </label>
                  <label className='block'>
                     <input
                        type='text'
                        name='admin'
                        value={newDepartment.admin}
                        onChange={handleInputChange}
                        placeholder='Enter Department admin'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                     />
                  </label>
                  <label className='block'>
                     <textarea
                        type='text'
                        name='description'
                        value={newDepartment.description}
                        onChange={handleInputChange}
                        placeholder='Enter Department description'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                     />
                  </label>

                  <div className='flex justify-end space-x-4'>
                     <button type='button' onClick={closeModal} className='mt-4 w-full bg-gray-100 border border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-300'>
                        Cancel
                     </button>
                     <button type='submit' className='mt-4 w-full bg-indigo-200 border border-indigo-300 text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300'>
                        Add Department
                     </button>
                  </div>
                  
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default DepartmentModal;