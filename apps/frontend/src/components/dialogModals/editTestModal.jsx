import { fetchDepartments } from "../../services/apiServices";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EditTestModal = ({ test, isOpen, onClose, onSave }) => {
     const [title, setTitle] = useState(test.title);
     const [department, setDepartment] = useState(test.department);
     const [departments, setDepartments] = useState([]);
     const [description, setDescription] = useState(test.description);
     const [status, setStatus] = useState(test.status);

     const allStatus = [
          { _id: '1', name: 'Scheduled' },
          { _id: '2', name: 'In Progress' },
          { _id: '3', name: 'Completed' },
          { _id: '4', name: 'Rescheduled' }
     ];

     useEffect(() => {
          fetchDepartments()
               .then((response) => setDepartments(response.data))
               .catch((error) => console.error('Error fetching departments:', error));
     }, []);

     const handleSave = () => {
          const updatedTest = {
               ...test,
               title,
               department,
               description,
               status,
          };
          onSave(updatedTest);
     };

     if (!isOpen) return null;

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onClose}
               contentLabel="Edit Test"
               className="fixed inset-0 flex justify-center items-center z-50"
               overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
          >
               <div className='relative bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <button className='absolute top-2 right-2 rounded-full px-2 hover:bg-gray-200 text-gray-600 text-xl hover:text-gray-800 transition-all duration-300' onClick={onClose}>&times;</button>

                    <h2 className='text-2xl font-bold mb-6 text-center'>Edit Test</h2>

                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className='space-y-4'>
                         <label className='block'>
                              <input type='text' name='title' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <label className='block'>
                              <select name='department' value={department} onChange={(e) => setDepartment(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                   <option value=''>Select Department</option>
                                   {departments.map((department) => (
                                        <option key={department.id} value={department.id}>{department.name}</option>
                                   ))}
                              </select>
                         </label>

                         <label className='block'>
                              <textarea name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>

                         <label className='block'>
                              <select name='status' value={test.status} onChange={(e) => setStatus(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                   <option value='' disabled>Select Status</option>
                                   {allStatus.map((status) => (
                                        <option key={status._id} value={status.name}>{status.name}</option>
                                   ))}
                              </select>
                         </label>

                         <div className='flex justify-end space-x-4'>
                              <button type='button' onClick={onClose} className='mt-4 w-full bg-gray-100 text-gray-600 text-sm border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-300'>
                                   Cancel
                              </button>
                              <button type='submit' className='mt-4 w-full bg-indigo-100 text-indigo-500 text-sm border border-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 transition-all duration-300'>
                                   Update
                              </button>
                         </div>
                    </form>
               </div>
          </Modal>
     )
}

export default EditTestModal;