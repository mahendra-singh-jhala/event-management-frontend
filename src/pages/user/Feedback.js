import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/AuthContext";

function FeedbackForm() {
    const [feedbackType, setFeedbackType] = useState("");
    const [description, setDescription] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [auth] = useAuth();
    
    // Extract token from auth object
    const token = auth?.token

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { feedbackType, description, firstname, lastname, email };

        try {
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/feedback", user, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(res.data) {
                toast.success("feedback Send Succsefully")
                setFeedbackType("")
                setDescription("")
                setFirstname("")
                setLastname("")
                setEmail("")
            }
        } catch (error) {
            toast.error("Error to send feedback")
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-2">Feedback Form</h1>
                <p className="text-gray-600 mb-6 text-xs">We would love to hear your thoughts, suggestions, concerns or problems with anything so we can improve!</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Feedback Type</label>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="Comments"
                                    checked={feedbackType === "Comments"}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="mr-2"
                                    name="feedbackType"
                                />
                                <label className="text-gray-700">Comments</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="Suggestions"
                                    checked={feedbackType === "Suggestions"}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="mr-2"
                                    name="feedbackType"
                                />
                                <label className="text-gray-700">Suggestions</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    value="Questions"
                                    checked={feedbackType === "Questions"}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="mr-2"
                                    name="feedbackType"
                                />
                                <label className="text-gray-700">Questions</label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Describe Your Feedback:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            rows="4"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <div className="flex space-x-4">
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="First Name"
                                className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last Name"
                                className="w-1/2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="myname@example.com"
                            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;