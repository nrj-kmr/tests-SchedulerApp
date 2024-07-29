import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TimePicker from 'react-time-picker';

const TestModal = ({ isOpen, closeModal, newTest, handleInputChange, handleAddTest }) => {
   const [departments, setDepartments] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:8000/api/admin/getDepartments')
         .then((response) => setDepartments(response.data))
         .catch((error) => console.error('Error fetching departments:', error));
   }, []);

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={closeModal}
         contentLabel='Add Test'
         className='fixed inset-0 flex justify-center items-center z-50'
         overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
      >
         <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <button className='absolute top-2 right-4 text-gray-500 hover:text-gray-700' onClick={closeModal}>&times;</button>

            <h2 className='text-2xl font-bold mb-6 text-center'>Add Test</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddTest(); }} className='space-y-4'>

               <div className='flex flex-col space-y-4'>
                  <label className='block'>
                     <input type='text' name='title' placeholder='Title' value={newTest.title} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                  </label>
                  <label className='block'>
                     <textarea type='text' name='description' placeholder='Description' value={newTest.description} onChange={handleInputChange} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 min-h-10 max-h-72' />
                  </label>

                  <div className='flex flex-row space-x-4'>
                     <label className='block flex-grow'>
                        <span className='text-gray-700'>Start Time:</span>
                        <TimePicker
                           onChange={(value) => handleTimeChange('startTime', value)}
                           value={newTest.startTime}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer'
                           disableClock={true}
                           clearIcon={null}
                           clockIcon={null}
                           format='HH:mm'
                           placeholder='Select Start Time'
                        />
                     </label>
                     <label className='block flex-grow'>
                        <span className='text-gray-700'>End Time:</span>
                        <TimePicker
                           onChange={(value) => handleTimeChange('endTime', value)}
                           value={newTest.endTime}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer'
                           disableClock={true}
                           clearIcon={null}
                           clockIcon={null}
                           format='HH:mm'
                           placeholder='Select End Time'
                        />
                     </label>
                  </div>

                  <label className='block'>
                     <select name="department"
                        value={newTest.department}
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
                        Add Test
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default TestModal;