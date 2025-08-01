import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/API";

function AdminProfile() {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastname: '',
        email: '',
        profilePicture: ''
    });
    const navigate = useNavigate();

    // Function to navigate to change password page
    const navigateHandler = () => {
        navigate("/changepassword");
    }
    
    // Function to navigate to update profile page
    const navigateUpdateHandler = () => {
        navigate("/updateAdminprofile");
    }

    // useEffect to fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/api/user");
                setUser(res.data.user);
            } catch (error) {
                console.error('Error fetching user', error);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <img 
                            src={`https://event-managment-56fc.onrender.com${user.profilePicture}`} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full mr-4" 
                        />
                        <div>
                            <h2 className="text-2xl font-semibold">{user.firstName} {user.lastname}</h2>
                        </div>
                    </div>
                    <button 
                        onClick={navigateUpdateHandler} 
                        className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg border border-purple-700 hover:bg-purple-200"
                    >
                        Edit Profile
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <input 
                            type="text" 
                            value={user.username} 
                            className="w-full mt-1 p-2 border rounded-lg" 
                            readOnly 
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            value={user.firstName} 
                            className="w-full mt-1 p-2 border rounded-lg" 
                            readOnly 
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            value={user.lastname} 
                            className="w-full mt-1 p-2 border rounded-lg" 
                            readOnly 
                        />
                    </div>
                    <div className="md:col-span-2">
                        <input 
                            type="email" 
                            value={user.email} 
                            className="w-full mt-1 p-2 border rounded-lg" 
                            readOnly 
                        />
                    </div>
                    <div>
                        <button 
                            onClick={navigateHandler} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            Change password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;
