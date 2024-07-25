import axios from "axios"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

function Signup({ onSuccess }) {
    const { signup } = useContext(AuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/user/signup', formData);
            if (response.status === 201) {
                if (onSuccess) onSuccess();
                navigate('/dashboard'); // handle successful signup
            }
        } catch (error) {
            console.error('Signup error', error);
            if (error.response && error.response.status === 400 && error.response.data) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again later.');
            }
        }
        signup({ firstname: formData.firstname, email: formData.email });
    }

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">

            <div className="flex flex-col items-center">
                <form onSubmit={handleSignup} className="min-w-80 max-w-screen">
                    <div className="flex flex-row space-x-2 mb-4">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded flex flex-row justify-center"
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 px-3 py-4 text-sm font-medium text-gray-400"
                            >
                                {passwordVisible ? "🙈 Hide" : "👁️ Show"}
                            </button>
                        </div>
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Signup</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;