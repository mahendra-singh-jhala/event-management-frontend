import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    
    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        
        const user = { email, password };

        try {
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/auth/login", user, {
                headers: {
                    "Content-type": "application/json",
                }
            });

            const data = res.data;

            if (res.status === 200) {
                toast.success(data.message || "Login successful");
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                    role: data.user.role
                });
                localStorage.setItem("auth", JSON.stringify(res.data))
                if (data.user.role === 1) {
                    navigate("/dashboard");
                } else {
                    navigate("/home"); 
                }
                setEmail("");
                setPassword("");
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error || error.response.data.message || "An error occurred");
            } else {
                toast.error("Login failed due to a network error");
            }
        } finally {
            setLoading(false); 
        }
    }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-l from-indigo-400 via-purple-800 to-pink-500">
            <div className="w-full max-w-md bg-gray-200 text-white bg-opacity-20 rounded-lg p-10 mx-4 sm:mx-10">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center text-3xl mt-4 mb-2">Login</h1>
                    <p className="text-center text-sm mb-8 text-gray-200">login to continue</p>

                    <div className="mb-3">
                        <label className="block mb-2 text-lg font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-md block w-full p-2.5 outline-none focus:border-blue-500 focus:border-2 hover:border-blue-500 hover:border-2"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-lg font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-md block w-full p-2.5 outline-none focus:border-blue-500 focus:border-2 hover:border-blue-500 hover:border-2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-sky-400 rounded-lg hover:bg-sky-800 mb-4 ${loading ? "opacity-50" : ""}`}
                        disabled={loading} 
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                    <div className="flex justify-between mt-2">
                        <Link to="/register" className="text-teal-400 hover:text-white cursor-pointer">Create a new account?</Link>
                        <Link to="/forget-password" className="text-blue-400 hover:text-white cursor-pointer">Forget Password</Link>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default LoginForm