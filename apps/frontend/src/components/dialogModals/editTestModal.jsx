import { deleteTest, fetchDepartments, serverURL } from "../../services/apiServices";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const EditTestModal = ({ test, isOpen, onClose, onSave, setSuccessMessage, isUserAdmin, userDept }) => {
     const [departments, setDepartments] = useState([]);
     const [title, setTitle] = useState(test.title);
     const [description, setDescription] = useState(test.description);
     const [date, setDate] = useState(new Date(test.date).toISOString().split('T')[0]);
     const [startTime, setStartTime] = useState(new Date(test.startTime).toISOString().split('T')[1].split('.')[0]);
     const [endTime, setEndTime] = useState(new Date(test.endTime).toISOString().split('T')[1].split('.')[0]);
     const [department, setDepartment] = useState(test.department);
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

     const combineDateAndTime = (dateString, timeString) => {
          const [year, month, day] = dateString.split('-').map(Number);
          const [hours, minutes, seconds] = timeString.split(':').map(Number);
          const date = new Date(year, month - 1, day, hours, minutes, seconds || 0);
          return isNaN(date.getTime()) ? null : date;
      };

      const handleSave = () => {
          const startDateTime = combineDateAndTime(date, startTime);
          const endDateTime = combineDateAndTime(date, endTime);

          // Adjust for local timezone offset
          const timezoneOffset = startDateTime.getTimezoneOffset() * 60000; // offset in milliseconds
          const startDateTimeUTC = new Date(startDateTime.getTime() - timezoneOffset);
          const endDateTimeUTC = new Date(endDateTime.getTime() - timezoneOffset);

          if (!startDateTimeUTC || !endDateTimeUTC) {
              console.error('Invalid date or time value');
              return;
          }

          const updatedTest = {
              ...test,
              title,
              description,
              date,
              startTime: startDateTimeUTC.toISOString(),
              endTime: endDateTimeUTC.toISOString(),
              department,
              status,
          };
          onSave(updatedTest);
          onClose();
      };

     const handleDeleteTest = () => {
          deleteTest(test._id)
               .then((response) => {
                    console.log('Test deleted successfully:', response.data);
                    onClose();
                    setSuccessMessage(`Test: '${test.title}' deleted successfully!`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
               })
               .catch((error) => {
                    onClose();
                    setSuccessMessage(`Error deleting test: '${test.title}' \n ${error.response.data.error}`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
                    console.error('Error deleting test:', error)
               })
     }

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
                              <input
                                   type='text'
                                   name='title'
                                   placeholder='Title'
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                              />
                         </label>

                         <label className='block'>
                              <textarea
                                   name='description'
                                   placeholder='Description'
                                   value={description}
                                   onChange={(e) => setDescription(e.target.value)}
                                   required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                              />
                         </label>

                         <label className="block">
                              <input
                                   type="date"
                                   name="date"
                                   value={date}
                                   onChange={(e) => setDate(e.target.value)}
                                   required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                              />
                         </label>

                         <div className="flex space-x-3">
                              <label className="block flex-grow">
                                   <input
                                        type="time"
                                        name="startTime"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   />
                              </label>

                              <label className="block flex-grow">
                                   <input
                                        type="time"
                                        name="endTime"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                   />
                              </label>
                         </div>

                         {isUserAdmin ? (
                              <label className='block'>
                                   <select
                                        name='department'
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                   >
                                        <option value=''>Select Department</option>
                                        {departments.map((department) => (
                                             <option key={department._id} value={department.id}>{department.name}</option>
                                        ))}
                                   </select>
                              </label>
                         ) : (
                              <label className='block'>
                                   <select
                                        name='department'
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                   >
                                        <option value='' disabled>Select Department</option>
                                        {departments.map((dept) => (
                                             <option key={dept._id} value={dept.id} disabled={dept.name !== userDept}>{dept.name}</option>
                                        ))}
                                   </select>
                              </label>
                         )}


                         <label className='block'>
                              <select
                                   name='status'
                                   value={status}
                                   onChange={(e) => setStatus(e.target.value)}
                                   required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                              >
                                   <option value='' disabled>Select Status</option>
                                   {allStatus.map((status) => (
                                        <option key={status._id} value={status.name}>{status.name}</option>
                                   ))}
                              </select>
                         </label>

                         <div className='flex justify-between'>
                              <span className="flex justify-start">
                                   <button
                                        type='button'
                                        onClick={handleDeleteTest}
                                        className='mt-4 w-full justify-start bg-red-100 text-red-600 text-sm border border-red-300 py-2 px-4 rounded-md hover:bg-red-300 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-all duration-300'
                                   >
                                        Delete test
                                   </button>
                              </span>
                              <span className="flex space-x-2 justify-end">
                                   <button
                                        type='button'
                                        onClick={onClose}
                                        className='mt-4 w-full justify-end bg-gray-100 text-gray-600 text-sm border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all duration-300'
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        type='submit'
                                        className='mt-4 w-full bg-indigo-100 text-indigo-500 text-sm border border-indigo-300 py-2 px-4 rounded-md hover:bg-indigo-300 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 transition-all duration-300'
                                   >
                                        Update
                                   </button>
                              </span>
                         </div>
                    </form>
               </div>
          </Modal>
     )
}

export default EditTestModal;