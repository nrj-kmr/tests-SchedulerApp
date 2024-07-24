// import axios from "axios"
// import { useEffect, useState } from "react";

export default function SignupForm() {
    // Handle formData here and send it to the backend so that backend can handle and store the formData in the Database. 
    
    // also do similar for login(check if user exists in db or note, if not then ask to signup displaying a proper message) And once done then route the user to their respective dashboards

    // here onwards handle loginForm Data
    // const [data, setData] = useState("")
    // const handleSignup = () => {
    //     const data = {

    //     }

    //     useEffect(() => {
    //         axios.post('http://localhost:8000/user')
    //             .then(response => {
    //                 setData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('There was an error fetching data!', error);
    //             });
    //     }, []);
    // } // handle the login/signup-Form Data here !!!

    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">

            <div className="flex flex-col items-center">
                <form className="min-w-80 max-w-screen">
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

                    {/* <button type="submit" onClick={handleSignup()} className="w-full p-2 mt-5 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Signup</button> */}
                </form>
            </div>
        </div>
    )
}