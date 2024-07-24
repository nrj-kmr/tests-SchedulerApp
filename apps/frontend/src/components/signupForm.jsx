import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        // useEffect(() => {
        //     axios.post('http://localhost:8000/user')
        //         .then(response => {
        //             setFirstname(response.data);
        //             setLastname(response.data);
        //             setEmail(response.data);
        //             setPassword(response.data);
        //             setIsAdmin(response.data);
        //         })
        //         .catch(error => {
        //             console.error('There was an error fetching data!', error);
        //         });
        // }, []);
        navigate('/dashboard');
    }

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">

            <div className="flex flex-col items-center">
                <form onSubmit={handleSignup} className="min-w-80 max-w-screen">
                    <div className="flex flex-row space-x-2">
                        <input type="text" placeholder="firstname" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded flex flex-row justify-center" />
                        <input type="text" placeholder="lastname" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Email</label>
                        <input type="email" placeholder="Email" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Password</label>
                        <input type="password" placeholder="Password" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
                    </div>
                    <div>
                        <input type="checkbox" className="mr-2" />
                        <label>isAdmin</label>
                    </div>

                    <button type="submit" className="w-full p-2 mt-5 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Signup</button>
                </form>
            </div>
        </div>
    )
}