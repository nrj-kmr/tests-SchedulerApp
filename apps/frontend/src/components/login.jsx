import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/login', {
                email,
                password,
                isAdmin
            });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isAdmin', isAdmin);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error', error);
            if (error.response && error.response.status === 400 && error.response.data) {
                setErrorMessage(error.response.data.message);
            }

        }
    }

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <form onSubmit={handleLogin} className="min-w-80 max-w-screen">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <div className='relative'>
                            <input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded"
                            />
                            <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-2 py-4 text-gray-400 text-sm font-medium"
                            >
                                {passwordVisible ? '🙈 Hide' : '👁️ Show'}
                            </button>
                        </div>
                    </div>
                    <div className='checkbox-container'>
                        <input
                        type="checkbox"
                        className="mr-2 cursor-pointer"
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label>Admin?</label>
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <button type="submit" className="w-full p-2 mt-3 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>

        </div>
    )
}