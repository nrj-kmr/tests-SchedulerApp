import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TestModal = ({ isOpen, closeModal, newTest, handleInputChange, handleAddTest }) => {
   const [departments, setDepartments] = useState([]);

   const allStatus = [
      { _id: '1', name: 'Scheduled' },
      { _id: '2', name: 'In Progress' },
      { _id: '3', name: 'Completed' },
      { _id: '4', name: 'Rescheduled' }
   ];

   useEffect(() => {
      axios.get('http://localhost:8000/api/admin/getDepartments')
         .then((response) => { setDepartments(response.data); })
         .catch((error) => console.error('Error fetching departments:', error));
   }, []);

   const handleSubmit = (e) => {
      e.preventDefault();

      const { date, startTime, endTime } = newTest;

      // Function to combine date and time into a Date Object
      const combineDateAndTime = (dateString, timeString) => {
         const [year, month, day] = dateString.split('-').map(Number);
         const [hours, minutes] = timeString.split(':').map(Number);
         return new Date(year, month - 1, day, hours, minutes);
      }

      // create startTime and endTime Objects
      const startDateTimeUTC = combineDateAndTime(date, startTime);
      const endDateTimeUTC = combineDateAndTime(date, endTime);

      //convert to Local Time Zone
      // const startDateTimeUTC = new Date(startDateTime.getTime() - startDateTime.getTimezoneOffset() * 60000)
      // const endDateTimeUTC = new Date(endDateTime.getTime() - endDateTime.getTimezoneOffset() * 60000)

      console.log(`Start DateTime UTC: ${startDateTimeUTC}`);
      console.log(`End DateTime UTC: ${endDateTimeUTC}`);

      console.log(`Start DateTime UTC (ISO): ${startDateTimeUTC.toISOString()}`);
      console.log(`End DateTime UTC (ISO): ${endDateTimeUTC.toISOString()}`);

      const formData = {
         ...newTest,
         startTime: startDateTimeUTC.toISOString(),
         endTime: endDateTimeUTC.toISOString()
      }

      handleAddTest(formData);
   }

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
            <form onSubmit={handleSubmit} className='space-y-4'>

               <div className='flex flex-col space-y-4 mb-4'>
                  <label className='block'>
                     <input
                        type='text'
                        name='title'
                        value={newTest.title}
                        placeholder='Enter test title'
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     />
                  </label>
                  <label className='block'>
                     <textarea
                        name='description'
                        value={newTest.description}
                        onChange={handleInputChange}
                        placeholder='Enter test description'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     />
                  </label>
                  <label className='block'>
                     <input
                        type='date'
                        name='date'
                        value={newTest.date}
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                        max='2040-12-31'
                        min='2022-01-01'
                     />
                  </label>
                  <div className='flex flex-row space-x-4'>
                     <label className='block flex-grow'>
                        <span className='text-gray-700'>Start Time:</span>
                        <input
                           type='time'
                           name='startTime'
                           value={newTest.startTime}
                           onChange={handleInputChange}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                           required
                           min='05:00'
                           max='20:00'
                        />
                     </label>
                     <label className='block flex-grow'>
                        <span className='text-gray-700'>End Time:</span>
                        <input
                           type='time'
                           name='endTime'
                           value={newTest.endTime}
                           onChange={handleInputChange}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                           required
                           min='05:00'
                           max='20:00'
                        />
                     </label>
                  </div>
                  <label className='block'>
                     <select
                        name='department'
                        value={newTest.department}
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     >
                        <option value='' disabled>Select Department</option>
                        {departments.map((dept) => (
                           <option key={dept._id} value={dept.name}>{dept.name}</option>
                        ))}
                     </select>
                  </label>
                  <label className='block'>
                     <select
                        name='status'
                        value={newTest.status}
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     >
                        <option value='' disabled>Status</option>
                        {allStatus.map((status) => (
                           <option key={status._id} value={status.name}>{status.name}</option>
                        ))}
                     </select>
                  </label>
                  <div className='flex justify-end space-x-4'>
                     <button type='button' onClick={closeModal} className='mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500'>
                        Cancel
                     </button>
                     <button type='submit' className='mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600'>
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