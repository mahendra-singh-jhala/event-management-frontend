import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EventForm = () => {
    // Initialize state to hold form data
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        ticketPricing: "",
        images: [],
        videos: [],
    });


    // Function to handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Function to handle file input changes
    const handleFileChange = (e) => {
        const { name } = e.target;
        const files = Array.from(e.target.files);
        setFormData({ ...formData, [name]: files });
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("title", formData.title);
        formDataToSubmit.append("description", formData.description);
        formDataToSubmit.append("date", formData.date);
        formDataToSubmit.append("time", formData.time);
        formDataToSubmit.append("location", formData.location);
        formDataToSubmit.append("category", formData.category);
        formDataToSubmit.append("ticketPricing", formData.ticketPricing);

        formData.images.forEach((file) => {
            formDataToSubmit.append("images", file);
        });

        formData.videos.forEach((file) => {
            formDataToSubmit.append("videos", file);
        });

        try {
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/events", formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (res.status === 200) {
                toast.success("Created successfully, wait for admin approval");
                setFormData({
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    location: "",
                    category: "",
                    ticketPricing: "",
                    images: [],
                    videos: [],
                });
            }
        } catch (error) {
            toast.error("Failed to create event, please try again");
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-4xl text-white font-bold text-center mb-8">Create Event</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={formData.title}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea
                            name="description"
                            placeholder="Event Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Select Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Select Time</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                            />
                        </div>
                    </div>

 <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="Event Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="Event Category"
                            value={formData.category}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Ticket Price</label>
                        <input
                            type="number"
                            name="ticketPricing"
                            placeholder="Ticket Price"
                            value={formData.ticketPricing}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Upload Images</label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Upload Video</label>
                        <input
                            type="file"
                            name="videos"
                            multiple
                            onChange={handleFileChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Create Event
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EventForm;