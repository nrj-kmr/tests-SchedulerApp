import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const TestModal = ({ isOpen, closeModal, handleAddTest }) => {
   const [newTest, setNewTest] = useState({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      department: '',
      createdBy: '',
      status: 'pending'
   });
   const [departments, setDepartments] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:8000/api/admin/getDepartments')
         .then((response) => setDepartments(response.data))
         .catch((error) => console.error('Error fetching departments:', error));
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setNewTest((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/api/admin/createTest', newTest)
         .then((response) => {
            console.log(response.data);
            handleAddTest(response.data);
            closeModal();
         })
         .catch((error) => console.error('Error creating test:', error));
   };

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
            <form onSubmit={handleSubmit}>
               <div className='flex flex-col space-y-4'>
                  <label className='block'>
                     <input
                        type='text'
                        name='title'
                        value={newTest.title}
                        placeholder='Enter test title'
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     />
                  </label>
                  <label className='block'>
                     <textarea
                        name='description'
                        value={newTest.description}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                           onChange={handleChange}
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
                           onChange={handleChange}
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
                        onChange={handleChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     >
                        <option value=''>Select Department</option>
                        {departments.map((dept) => (
                           <option key={dept._id} value={dept._id}>{dept.name}</option>
                        ))}
                     </select>
                  </label>
                  <button type='submit' className='mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                     Add Test
                  </button>
               </div>
            </form>
         </div>
      </Modal>
   );
};

export default TestModal;