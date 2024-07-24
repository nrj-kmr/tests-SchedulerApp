import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        // const response = await axios('http://localhost:8000/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email, password }),
        // });
        navigate('/dashboard');
    }

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <form onSubmit={handleLogin} className="min-w-80 max-w-screen">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" placeholder="email" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input type="password" placeholder="Password" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Login</button>
                </form>
            </div>

        </div>
    )
}