import { fetchDepartments } from "../../services/apiServices";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EditDepartmentModal = ({ department, isOpen, onClose, onSave }) => {
     const [name, setName] = useState(department.name);
     const [description, setDescription] = useState(department.description);

     useEffect(() => {
          fetchDepartments()
               .then((response) => setDepartments(response.data))
               .catch((error) => console.error('Error fetching departments:', error));
     }, []);

     const handleSave = () => {
          const updatedDepartment = {
               ...department,
               name,
               description,
          };
          onSave(updatedDepartment);
     };

     if (!isOpen) return null;

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onClose}
               contentLabel="Edit Department"
               className="fixed inset-0 flex justify-center items-center z-50"
               overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
          >
               <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <button className='absolute top-2 right-4 text-gray-500 hover:text-gray-700' onClick={onClose}>&times;</button>

                    <h2 className='text-2xl font-bold mb-6 text-center'>Edit Department</h2>

                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className='space-y-4'>
                         <label className='block'>
                              <input type='text' name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <label className='block'>
                              <textarea type='text' name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <div className='flex justify-end space-x-4'>
                              <button type='button' onClick={onClose} className='mt-4 w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500'>
                                   Cancel
                              </button>
                              <button type='submit' className='mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600'>
                                   Add Test
                              </button>
                         </div>

                    </form>
               </div>
          </Modal>
     )
}

export default EditDepartmentModal;