
import { useNavigate } from "react-router-dom"
export default function Signup() {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-700 min-h-screen text-white">
            <button className="border border-gray rounded-md p-1 m-4 hover:bg-gray-800 transition-colors"
                onClick={() => {
                    navigate('/')
                }}>Back</button>

            <div className="flex flex-col items-center">
                <h2 className="text-center text-3xl font-bold mb-6 pt-20">Signup here</h2>
                <form action=""
                    className="border border-gray rounded-md p-5 max-w-80"
                >
                    email : <input type="email" placeholder="Enter an Email" className="bg-slate-600 border-none rounded-md p-1 mb-3" /> <br />

                    username : <input type="text" placeholder="choose a your username" className="bg-slate-600 border-none rounded-md p-1 mb-3" /> <br />

                    password : <input type="password" placeholder="Choose a password" className="bg-slate-600 border-none rounded-md p-1 mb-3" /> <br />
                    <button className="border border-gray rounded-md p-1 m-4  hover:bg-gray-800 transition-colors">Signup</button>
                </form>
            </div>
        </div>
    )
}