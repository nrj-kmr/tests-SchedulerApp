import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { useContext } from 'react';

import { serverURL } from '../services/apiServices.jsx';

export default function Login() {
    const navigate = useNavigate();

    // User login state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [allDepartments, setAllDepartments] = useState([]);
    const [passwordVisible, setPasswordVisible] = useState(false); // toggle password visibility

    // errors:
    const [credentialsResponse, setCredentialsResponse] = useState('');
    const [departmentError, setDepartmentError] = useState('');
    const [generalError, setGeneralError] = useState('');

    // Get all departments for the dropdown
    useEffect(() => {
        axios.get(`${serverURL}/api/admin/getDepartments`)
            .then((response) => setAllDepartments(response.data))
            .catch((error) => console.error('Error fetching departments:', error));
    }, []);

    // Handle login form submission
    const { user, login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset all errors
        setCredentialsResponse('');
        setDepartmentError('');
        setGeneralError('');

        if (!department) {
            setDepartmentError('Department is required!');
            return;
        }

        try {
            // verify the user's email and password
            const credentialsResponse = await axios.post(`${serverURL}/api/user/verifyCredentials`, {
                email,
                password
            });
            if (!credentialsResponse.data.valid) {
                setCredentialsResponse('Invalid email or password!');
                return;
            }

            // Fetch the actual department of the user form the backend
            const departmentResponse = await axios.get(`${serverURL}/api/admin/getDepartment/${email}`);
            const actualDepartment = departmentResponse.data.department;
            if (actualDepartment !== department) {
                setDepartmentError('User does not belong to this department!');
                return;
            }

            // Proceed with login if all checks pass
            const response = await axios.post(`${serverURL}/api/user/login`, {
                email,
                password,
                department,
            });
            if (response.status === 200) {
                sessionStorage.setItem('adminToken', response.data.token);
                navigate('/dashboard', { state: { userDepartment: actualDepartment } });
            }
        } catch (error) {
            console.error('Login error', error);
            if (error.response && error.response.status === 400 && error.response.data) {
                console.log('error.response.data', error.response.data);
                setGeneralError(error.response.data.message);
                console.log('generalError', generalError);
            } else {
                setGeneralError('An unexpected error occurred. Please try again later.');
            }
        }
        login({ email });
    }

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <form onSubmit={handleLogin} className="min-w-80 max-w-screen">
                    <h1 className='text-center text-xl font-semibold'>User Login</h1>
                    <p className='text-center text-sm mb-2'>Login to your account</p>
                    <hr className='border-gray-500 mb-5' />
                    <div className="mb-4">
                        <label className="block text-sm font-medium">User ID</label>
                        <input
                            type="email"
                            placeholder="Email or User ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Password</label>
                        <div className='relative'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-0 right-0 px-2 py-4 text-gray-400 text-sm font-medium"
                            >
                                {passwordVisible ? '🙈 Hide' : '👁️ Show'}
                            </button>
                        </div>
                    </div>
                    {credentialsResponse && <p className="text-pink-300 m-2">{credentialsResponse}</p>}
                    <div className='mb-4'>
                        <label className="block text-sm font-medium">Department</label>
                        <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select your department</option>
                            {allDepartments.map((dept) => (
                                <option key={dept._id} value={dept.name}
                                >{dept.name}</option>
                            ))}
                        </select>
                        {departmentError && <p className="text-pink-300 m-2">{departmentError}</p>}
                    </div>
                    {generalError ? (<p className="text-pink-300 mb-4">{generalError}</p>) : null}
                    <button type="submit" className="w-full p-2 mt-3 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>

        </div>
    )
}