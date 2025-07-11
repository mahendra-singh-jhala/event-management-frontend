import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { FaLock, FaSyncAlt } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";


function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [auth] = useAuth();

    // Get token from auth object
    const token = auth?.token

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { oldPassword, newPassword, confirmPassword }

        try {
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/user/changepassword", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.status === 200) {
                toast.success("password successful Changed");
                setOldPassword("")
                setNewPassword("")
                setConfirmPassword("")
            }
        } catch (error) {
            toast.error("Error to password change")
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2">Password change form</h2>
                <p className="text-gray-500 mb-4">Create a new secure password</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Old Password</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <FaLock className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="repeat-password">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <FaSyncAlt className="absolute right-3 top-3 text-gray-400" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">CHANGE PASSWORD</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword
