import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { fetchDepartments } from '../../services/apiServices';
import { AuthContext } from '../../context/AuthContext';

const UserOptionsDialog = ({ user, isOpen, onClose, onSave }) => {
     const [firstname, setFirstname] = useState(user.firstname);
     const [lastname, setLastname] = useState(user.lastname);
     const [email, setEmail] = useState(user.email);
     const [password, setPassword] = useState('');
     const [showPasswordInput, setShowPasswordInput] = useState(false);
     const [passwordVisible, setPasswordVisible] = useState(false);
     const [department, setDepartment] = useState(user.department);
     const [role, setRole] = useState('');
     const { isUserAdmin } = useContext(AuthContext);
     const [isAdmin, setIsAdmin] = useState(isUserAdmin);

     const [departments, setDepartments] = useState([]);

     useEffect(() => {
          fetchDepartments()
               .then((response) => setDepartments(response.data))
               .catch((error) => console.error('Error fetching departments:', error));
     }, []);

     useEffect(() => {
          setIsAdmin(user.role === 'Admin');
     }, [role])
     const handleToggleRole = () => {
          setRole(prevRole => (prevRole === 'Admin' ? 'User' : 'Admin'));
     }

     const handleSave = () => {
          const updatedUser = {
               ...user,
               firstname,
               lastname,
               role,
               department,
               password,
               email,
          };
          onSave(updatedUser);
     };

     if (!isOpen) return null;

     return (
          <Modal
               isOpen={isOpen}
               onRequestClose={onClose}
               contentLabel="Edit User"
               className="fixed inset-0 flex justify-center items-center z-50"
               overlayClassName='fixed inset-0 bg-black bg-opacity-70 z-40'
          >
               <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                    <button className='absolute top-2 right-4 text-gray-500 hover:text-gray-700' onClick={onClose}>&times;</button>

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
                                   {departments.map((department) => (
                                        <option key={department._id} value={department.name}>{department.name}</option>
                                   ))}
                              </select>
                         </label>

                         <label className='block'>
                              <select
                                   name='role'
                                   value={role}
                                   onChange={(e) => setRole(e.target.value)}
                                   required
                                   className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                              >
                                   <option value='' disabled>Select Role</option>
                                   <option value='admin'>Admin</option>
                                   <option value='user'>User</option>
                              </select>
                         </label>

                         <div className='mt-4'>
                              <label className='flex items-center'>
                                   <input
                                        type='checkbox'
                                        checked={role === 'Admin'}
                                        onChange={handleToggleRole}
                                        className='toggle-checkbox' />
                                   <span className='ml-2'>{role ? role : 'toggle role'}</span>
                              </label>
                         </div>

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

                         <label className='block'>
                              <button
                                   className='border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 hover:text-gray-800'
                                   onClick={(e) => {
                                        e.preventDefault();
                                        setPassword('password');
                                        setShowPasswordInput(true);
                                   }}
                              >
                                   {showPasswordInput ? 'Reset Again' : 'Reset Password'}
                              </button>
                         </label>

                         <div className='flex justify-end space-x-3'>
                              <button type='button' onClick={onClose} className='py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700'>Cancel</button>
                              <button type='submit' className='py-2 px-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700'>Save</button>
                         </div>
                    </form>
               </div>
          </Modal>
     );
};

export default UserOptionsDialog;