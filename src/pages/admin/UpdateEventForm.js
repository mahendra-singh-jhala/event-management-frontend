import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateEventForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        ticketPricing: "",
        category: "",
    });

    // useEffect to fetch event data 
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`https://event-managment-56fc.onrender.com/api/events/${id}`);
                setEventData(res.data);
            } catch (error) {
                toast.error("Error to fetching event");
            }
        };
        fetchEvent();
    }, [id]);

    
    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };


    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://event-managment-56fc.onrender.com/api/events/${id}`, eventData);
            if (res.status === 200) {
                toast.success("Update successful");
                navigate(`/event/${id}`); 
            }
        } catch (error) {
            toast.error("Error updating event");
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-4xl text-white font-bold text-center mb-8">Update Event</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            value={eventData.title}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea
                            name="description"
                            placeholder="Event Description"
                            value={eventData.description}
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
                                value={eventData.date}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Select Time</label>
                            <input
                                type="time"
                                name="time"
                                value={eventData.time}
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
                            value={eventData.location}
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
                            value={eventData.category}
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
                            value={eventData.ticketPricing}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                        Update Event
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateEventForm;
