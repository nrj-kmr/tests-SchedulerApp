import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const DepartmentModal = ({ isOpen, closeModal, handleInputChange, handleAddDepartment }) => {
   const [newDepartment, setNewDepartment] = useState({ name: '', admin: '' });
   const [departments, setDepartments] = useState([]);
   const [passwordVisible, setPasswordVisible] = useState(false);

   useEffect(() => {
      axios.get('http://localhost:8000/api/admin/getDepartments')
         .then((response) => setDepartments(response.data))
         .catch((error) => console.error('Error fetching departments:', error));
   }, []);

   // const handleChange = (e) => {
   //    const { name, value } = e.target;
   //    setNewDepartment((prevState) => ({
   //       ...prevState,
   //       [name]: value,
   //    }));
   // };

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/api/admin/createDepartment', newTest)
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

            <h2 className='text-2xl font-bold mb-6 text-center'>Add Department</h2>
            <form onSubmit={handleSubmit}>
               <div className='flex flex-col space-y-4'>
                  <label className='block'>
                     <input
                        type='text'
                        name='title'
                        value={newDepartment.name}
                        placeholder='Enter Department name'
                        onChange={handleInputChange}
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        required
                     />
                  </label>
                  <label className='block'>
                     <input
                        name='text'
                        value={newDepartment.admin}
                        onChange={handleInputChange}
                        placeholder='Enter Department admin'
                        className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                     />
                  </label>

                  <div className='flex justify-end space-x-4'>
                     <button type='button' onClick={closeModal} className='mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500'>
                        Cancel
                     </button>
                     <button type='submit' className='mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
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