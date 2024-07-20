import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-700  min-h-screen text-white">
            <h1 className="text-center text-3xl font-bold mb-6 pt-20">theScheduler App</h1>

            <div className="flex items-center justify-center">
                <button className="border border-gray rounded-2xl p-2 mr-1 hover:bg-gray-800 transition-colors"
                    onClick={() => {
                        navigate("/login")
                    }}>Login</button>

                <button className="border border-gray rounded-2xl p-2 hover:bg-gray-800 transition-colors"
                    onClick={() => {
                        navigate("/signup")
                    }}>Signup</button>
            </div>
        </div>
    )
}