import React, { useState, forwardRef } from "react";
import Modal from "react-modal";
import { deleteDepartment } from "../../services/apiServices";

const EditDepartmentModal = forwardRef(({ users, department, isOpen, onClose, onSave, setSuccessMessage }, ref) => {
     const [name, setName] = useState(department.name);
     const [admin, setAdmin] = useState(department.admin);
     const [description, setDescription] = useState(department.description);

     const handleSave = () => {
          const updatedDepartment = {
               ...department,
               name,
               admin,
               description,
          };
          onSave(updatedDepartment);
     };

     const handleDeleteDepartment = () => {
          deleteDepartment(department._id)
               .then((response) => {
                    console.log('Department deleted successfully:', response.data);
                    onClose();
                    setSuccessMessage(`Department: '${department.name}' deleted successfully!`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
               })
               .catch((error) => {
                    onClose();
                    setSuccessMessage(`Error deleting department: '${department.name}' \n ${error.response.data.error}`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
                    console.error('Error deleting department:', error)
               })
     }

     if (!isOpen) return null;

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onClose}
               contentLabel="Edit Department"
               className="fixed inset-0 flex justify-center items-center z-50"
               overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
          >
               <div ref={ref} className='relative bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <button className='absolute top-2 right-2 rounded-full px-2 hover:bg-gray-200 text-gray-600 text-xl hover:text-gray-800 transition-all duration-300' onClick={onClose}>&times;</button>

                    <h2 className='text-2xl font-bold mb-6 text-center'>Edit Department</h2>

                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className='space-y-4'>
                         <label className='block'>
                              <input
                                   type='text'
                                   name='name'
                                   placeholder='Name'
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                                   required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <label className='block'>
                              <textarea
                                   type='text'
                                   name='description'
                                   placeholder='Description'
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   className='mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <label>
                              <select
                                   name='admin'
                                   value={admin}
                                   onChange={(e) => setAdmin(e.target.value)}
                                   className='mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                   <option value='' disabled>--Select Admin--</option>
                                   {users
                                        .filter(user => user.isAdmin)
                                        .map((user) => (
                                             <option
                                                  key={user._id}
                                                  value={user.name}
                                             >
                                                  {user.firstname} {user.lastname}
                                             </option>
                                        ))}
                              </select>
                         </label>

                         <div className='flex justify-between'>
                              <span className="flex justify-start">
                                   <button type='button' onClick={handleDeleteDepartment} className='mt-4 w-full bg-red-100 text-red-600 border border-red-300 py-2 px-4 rounded-md hover:bg-red-300 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-300'>
                                        Delete
                                   </button>
                              </span>
                              <span className="flex justify-end space-x-2">
                                   <button type='button' onClick={onClose} className='mt-4 w-full bg-gray-100 text-gray-600 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-300'>
                                        Cancel
                                   </button>
                                   <button type='submit' className='mt-4 w-full bg-indigo-200 text-indigo-600 border border-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 transition-all duration-300'>
                                        Update
                                   </button>
                              </span>
                         </div>
                    </form>
               </div>
          </Modal>
     )
});

export default EditDepartmentModal;