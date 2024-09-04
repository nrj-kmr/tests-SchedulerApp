import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { deleteUser, fetchDepartments } from '../../services/apiServices';
import { AuthContext } from '../../context/AuthContext';

const editUserModal = ({ user, isOpen, onClose, onSave, setSuccessMessage }) => {
     const [firstname, setFirstname] = useState(user.firstname);
     const [lastname, setLastname] = useState(user.lastname);
     const [email, setEmail] = useState(user.email);
     const [password, setPassword] = useState(user.password);
     const [showPasswordInput, setShowPasswordInput] = useState(false);
     const [passwordVisible, setPasswordVisible] = useState(false);
     const [department, setDepartment] = useState(user.department);
     const { isUserAdmin } = useContext(AuthContext);
     const [isAdmin, setIsAdmin] = useState(user.isAdmin);

     const [departments, setDepartments] = useState([]);

     useEffect(() => {
          fetchDepartments()
               .then((response) => setDepartments(response.data))
               .catch((error) => console.error('Error fetching departments:', error));
     }, []);

     const handleToggleRole = (event) => {
          console.log('event.target.checked:', event.target.checked);
          setIsAdmin(event.target.checked);
     };

     const handleSave = () => {
          console.log('saving user with isAdmin', isAdmin);
          const updatedUser = {
               ...user,
               firstname,
               lastname,
               email,
               department,
               isAdmin,
               password,
          };
          onSave(updatedUser);
     };
     const handleDeleteUser = () => {
          deleteUser(user._id)
               .then((response) => {
                    console.log('User deleted successfully:', response.data);
                    onClose();
                    setSuccessMessage(`User: '${user.firstname}' deleted successfully!`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
               })
               .catch((error) => {
                    onClose();
                    setSuccessMessage(`Error deleting user: '${user.firstname}' \n ${error.response.data.error}`);
                    setTimeout(() => {
                         setSuccessMessage('');
                    }, 3000);
               });
     }

     if (!isOpen) return null;

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onClose}
               contentLabel="Edit User"
               className="fixed inset-0 flex justify-center items-center z-50"
               overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
          >
               <div className='relative bg-gray-50 p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <button className='absolute top-2 right-2 rounded-full px-2 hover:bg-gray-200 text-gray-600 text-xl hover:text-gray-800 transition-all duration-300' onClick={onClose}>&times;</button>

                    <h2 className='text-2xl font-bold mb-6 text-center'>Edit User</h2>

                    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className='space-y-4'>

                         <div className="flex flex-row space-x-2 mb-4">
                              <label className='block'>
                                   <input type='text' name='firstname' placeholder='First Name' value={firstname} onChange={(e) => setFirstname(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                              </label>
                              <label className='block'>
                                   <input type='text' name='lastname' placeholder='Last Name' value={lastname} onChange={(e) => setLastname(e.target.value)} className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                              </label>
                         </div>

                         <label className='block'>
                              <input type='email' name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500' />
                         </label>


                         <label className='block'>
                              <select name='department' value={department} onChange={(e) => setDepartment(e.target.value)} required className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'>
                                   <option value='' disabled>Select Department</option>
                                   {departments.map((dept) => (
                                        <option key={dept._id} value={dept.name}>{dept.name}</option>
                                   ))}
                              </select>
                         </label>


                         {showPasswordInput && (
                              <>
                                   <div className='relative'>
                                        <span className='text-sm text-gray-600 pt-2 pb-1 block'>this will be the new password, replace to change</span>
                                        <input
                                             type={passwordVisible ? 'text' : 'password'}
                                             name='password'
                                             placeholder='Password'
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                             required
                                             className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                        />
                                        <button
                                             type='button'
                                             onClick={() => setPasswordVisible(!passwordVisible)}
                                             className='absolute inset-y-0 right-0 px-3 py-11 text-sm font-medium text-gray-400'
                                        >
                                             {passwordVisible ? '🙈 Hide' : '👁️ Show'}
                                        </button>
                                   </div>
                              </>
                         )}

                         <div className='mt-4 flex justify-between'>
                              <label className='flex items-center justify-start'>
                                   <input
                                        type='checkbox'
                                        checked={isAdmin}
                                        onChange={handleToggleRole}
                                        className='toggle-checkbox'
                                   />
                                   <span className='ml-2'>{isAdmin ? 'Admin' : 'User'}</span>
                              </label>
                              <label className='flex items-center justify-end'>
                                   <button
                                        className='border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 text-gray-600 hover:text-gray-800 hover:bg-gray-300 transition-all duration-300'
                                        onClick={(e) => {
                                             e.preventDefault();
                                             setPassword('password');
                                             setShowPasswordInput(true);
                                        }}
                                   >
                                        {showPasswordInput ? 'Reset Again' : 'Reset Password'}
                                   </button>
                              </label>
                         </div>

                         <div className='flex justify-between'>
                              <span className='flex justify-start'>
                                   <button type='button' onClick={handleDeleteUser} className='mt-4 justify-start px-4 py-2 border border-red-300 text-sm bg-red-100 rounded-md text-red-500 hover:text-red-600 hover:bg-red-300 transition-all duration-400'>Delete User</button>
                              </span>
                              <span className='flex space-x-2 justify-end'>
                                   <button type='button' onClick={onClose} className='mt-4 justify-end py-2 px-4 bg-gray-100 border border-gray-300 text-sm text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-300 transition-all duration-300'>Cancel</button>
                                   <button type='submit' className='mt-4 justify-end py-2 px-4 border border-green-300 bg-green-100 text-sm text-green-600 rounded-md hover:text-green-800 hover:bg-green-300 transition-all duration-300'>Save</button>
                              </span>
                         </div>
                    </form>
               </div>
          </Modal>
     );
};

export default editUserModal;