import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../../api/API";

function UpdateAdminProfile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastname, setLastname] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    // Create ref for file input
    const inputRef = useRef();

    // Function to handle profile picture click
    const handlprofileClick = () => {
        inputRef.current.click();
    }

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("firstName", firstName);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("profilePicture", profilePicture);

        try {
            const res = await api.post("/api/user/updateprofile", formData);
            if (res.status === 200) {
                toast.success("Update successful");
                setUsername("");
                setEmail("");
                setFirstName("");
                setLastname("");
                setProfilePicture(null);
                navigate("/adminProfile");
            }
        } catch (error) {
            toast.error("Error updating profile");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <div onClick={handlprofileClick} className="flex items-center justify-between mb-6">
                    <div className="flex items-center" >
                        {profilePicture ? <img className="w-24 h-24 rounded-full mr-4" src={URL.createObjectURL(profilePicture)} alt="Profile" /> : <FaUserCircle className="w-24 h-24 rounded-full mr-4" />}
                        <input
                            type="file"
                            ref={inputRef}
                            onChange={(e) => setProfilePicture(e.target.files[0])}
                            className="w-full mt-1 p-2 border rounded-lg"
                            hidden
                        />
                    </div>

                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-gray-600">User Name</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-gray-600">First Name</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-gray-600">Last Name</label>
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-gray-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg" />
                        </div>

                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>        
        </div>
    );
}

export default UpdateAdminProfile;