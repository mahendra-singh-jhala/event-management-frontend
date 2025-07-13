import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";
import api from "../../../api/API";

const ForgetPassword = () => {
    const [email, setEmail] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate()

    // use to navigate back to login page
    const navigateHandler = () => {
        navigate("/login")
    }
    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        const user = { email };
        try {
            const res = await api.post("/api/auth/forget-password", user);
            const data = res.data;
            if (res.status === 200) {
                toast.success(data.message || "Link Send successful");
                setEmail("");
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.error || error.response.data.message || "An error occurred");
            } else {
                toast.error("Link Not Send, failed due to a network error");
            }
        } finally {
            setLoading(false); 
        }
        
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-l from-indigo-400 via-purple-800 to-pink-500">
            <div className="w-full max-w-md bg-gray-200 text-white bg-opacity-20 rounded-lg p-10 mx-4 sm:mx-10">
                <form onSubmit={handleSubmit} >
                    <h1 className="text-center text-3xl mt-4 mb-2"> Forget Password </h1>
                    <p className="text-center text-sm mb-8 text-gray-200"> Enter your registered email we send link to rest password </p>

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

                    <button
                        type="submit"
                        className={`w-full px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-sky-400 rounded-lg hover:bg-sky-800 ${loading ? "opacity-50" : ""}`}
                        disabled={loading} 
                    >
                        {loading ? "Loading..." : "Send Link"}
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

export default ForgetPassword