import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-700 min-h-screen text-white">
            {/* <button className="border border-gray rounded-md p-1 m-4 hover:bg-gray-800 transition-colors"
                onClick={() => {
                    navigate('/')
                }}>Back</button> */}

            <div className="flex flex-col items-center">
                {/* <h2 className="text-center text-3xl font-bold mb-6 pt-20">Welcome Back,<br /> Login to your Account</h2> */}
                <form action=""
                    className="border border-gray rounded-md p-5 max-w-80"
                >
                    username : <input type="text" placeholder="enter your username" className="bg-slate-600 border-none rounded-md p-1 mb-3" /> <br />

                    password : <input type="password" placeholder="type password" className="bg-slate-600 border-none p-1 rounded-md" /> <br />

                    <button className="border border-gray rounded-md p-1 m-4 hover:bg-gray-800 transition-colors">Login</button>
                </form>
            </div>

        </div>
    )
}