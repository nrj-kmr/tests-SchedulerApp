export default function LoginForm() {
    return (
        <div className="bg-slate-600 p-6 rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <form className="min-w-80 max-w-screen">
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Username</label>
                        <input type="text" placeholder="Username" className="w-full p-2 mt-1 bg-slate-700 border border-gray-500 rounded" />
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