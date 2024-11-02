import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

const RegisterForm = () => {

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()

    // use to navigate back to login page
    const navigateHandler = () => {
        navigate("/login")
    }

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        const user = { username, email, password };
        
        try {
            setLoading(true)
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/auth/register", user, {
                headers: {
                    "Content-type": "application/json",
                }
            });
            const data = res.data;
            if (res.status === 200) {
                toast.success(data.message || "Registration successful");
                setUsername("");
                setEmail("");
                setPassword("");
            }

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error || error.response.data.message || "An error occurred");
            } else {
                toast.error("Registration failed due to a network error");
            } 
        } finally {
            setLoading(false); 
        }
    }


    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-l from-indigo-400 via-purple-800 to-pink-500">
            <div className="w-full max-w-md bg-gray-200 text-white bg-opacity-20 rounded-lg p-10 mx-4 sm:mx-10">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center text-3xl mt-4 mb-2">Register</h1>
                    <p className="text-center text-sm mb-8 text-gray-200">Create a new account</p>

                    <div className="mb-3">
                        <label className="block mb-2 text-lg font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-50 text-gray-900 text-sm border border-gray-300 rounded-md block w-full p-2.5 outline-none focus:border-blue-500 focus:border-2 hover:border-blue-500 hover:border-2"
                            required
                        />
                    </div>
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
                        className={`w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-sky-400 rounded-lg hover:bg-sky-800 ${loading ? "opacity-50" : ""}`}
                        disabled={loading} 
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                    

                    <div onClick={navigateHandler} className="w-full flex items-center justify-center px-5 py-2 sm:mt-6 text-sm font-medium text-center bg-gray-400 bg-opacity-50 rounded cursor-pointer">
                        <span className="text-xl me-3"><IoArrowBack /></span>
                        <span> Back to Login</span>
                    </div>
                </form>
            </div>
        </div>

    )
}


export default RegisterForm