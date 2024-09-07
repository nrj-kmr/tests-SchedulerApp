import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import { addTest, fetchDepartments } from '../../services/apiServices';

const TestModal = forwardRef(({ isOpen, closeModal, isUserAdmin, userDept }, ref) => {
   const [departments, setDepartments] = useState([]);

   const [newTest, setNewTest] = useState({ title: '', description: '', department: '', date: '', startTime: '', endTime: '', status: '' });
   const handleInputChange = (e) => {
      setNewTest((prevTest) => ({...prevTest, [e.target.name]: e.target.value}));
   }

   const allStatus = [
      { _id: '1', name: 'Scheduled' },
      { _id: '2', name: 'In Progress' },
      { _id: '3', name: 'Completed' },
      { _id: '4', name: 'Rescheduled' }
   ];

   useEffect(() => {
      fetchDepartments()
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
      const startDateTime = combineDateAndTime(date, startTime);
      const endDateTime = combineDateAndTime(date, endTime);

      // Adjust for local timezone offset
      const timezoneOffset = startDateTime.getTimezoneOffset() * 60000; // offset in milliseconds
      const startDateTimeUTC = new Date(startDateTime.getTime() - timezoneOffset);
      const endDateTimeUTC = new Date(endDateTime.getTime() - timezoneOffset);

      const formData = {
         ...newTest,
         startTime: startDateTimeUTC.toISOString(),
         endTime: endDateTimeUTC.toISOString()
      }

      try {
         addTest(formData)
         closeModal();
      } catch (error) {
         console.error('Error adding test:', error);
      }
   }

   // Function to get the current time in 'HH:MM' format
  const getCurrentTime = () => {
   const now = new Date();
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes()).padStart(2, '0');
   return `${hours}:${minutes}`;
 };

 // Function to get the time 2 hours from now in 'HH:MM' format
 const getTimeTwoHoursLater = () => {
   const now = new Date();
   now.setHours(now.getHours() + 2);
   const hours = String(now.getHours()).padStart(2, '0');
   const minutes = String(now.getMinutes()).padStart(2, '0');
   return `${hours}:${minutes}`;
 };

 // Set the default date, start time, and end time when the component mounts
 useEffect(() => {
   if (isOpen) {
     const currentDate = new Date().toISOString().split('T')[0];
     const currentTime = getCurrentTime();
     const endTime = getTimeTwoHoursLater();

     handleInputChange({ target: { name: 'date', value: currentDate } });
     handleInputChange({ target: { name: 'startTime', value: currentTime } });
     handleInputChange({ target: { name: 'endTime', value: endTime } });
   }
 }, [isOpen]);

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={closeModal}
         contentLabel='Add Test'
         className='fixed inset-0 flex justify-center items-center z-50'
         overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
      >
         <div ref={ref} className='relative bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md'>
            <button className='absolute top-2 right-2 rounded-full px-2 hover:bg-gray-200 text-gray-600 text-xl hover:text-gray-800 transition-all duration-300' onClick={closeModal}>&times;</button>

            <h2 className='text-2xl font-bold mb-6 text-center'>Add Test</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>

               <div className='flex flex-col space-y-4'>
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
                  <div className='flex flex-row space-x-3'>
                     <label className='block flex-grow'>
                        <span className='text-gray-700'>Start Time:</span>
                        <input
                           type='time'
                           name='startTime'
                           value={newTest.startTime}
                           onChange={handleInputChange}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                           required
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
                        />
                     </label>
                  </div>
                  {isUserAdmin ? (
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
                  ) : (
                     <label className='block'>
                        <select
                           name='department'
                           value={userDept}
                           onChange={handleInputChange}
                           className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                           required
                        >
                           <option value='' disabled>Select Department</option>
                           {departments.map((dept) => (
                              <option key={dept._id} value={dept.name} disabled={dept.name !== userDept}>{dept.name}</option>
                           ))}
                        </select>
                     </label>
                  )}

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
                  <div className='flex space-x-4'>
                     <button type='button' onClick={closeModal} className='mt-4 w-full bg-gray-100 text-gray-600 text-sm border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-300'>
                        Cancel
                     </button>
                     <button type='submit' className='mt-4 w-full bg-indigo-100 text-indigo-500 text-sm border border-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 transition-all duration-300'>
                        Add Test
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </Modal>
   );
});

export default TestModal;