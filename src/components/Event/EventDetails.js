import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTag } from 'react-icons/fa';
import { GiTicket } from 'react-icons/gi';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../api/API";

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const { auth } = useAuth();
    const navigate = useNavigate()

    // Use navigate to go to the ticket page
    const navigateHandler = () => {
        navigate(`/event/${id}/ticket`)
    }

    // Use navigate to go to the update form
    const updateEventHandler = () => {
        navigate(`/event/${id}/updateForm`)
    }

    // useEffect to fetch event details
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/api/events/${id}`);
                setEvent(res.data?.events);
            } catch (error) {
                console.error('Error fetching event', error);
            }
        };
        fetchEvent();
    }, [id]);


    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Function to format time
    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString(undefined, options);
    };

    // Function to handle event deletion
    const deleteEventHandler = async () => {
        try {
            const res = await api.delete(`/api/events/${id}`)
            if(res.status === 200) {
                toast.success("successfull to delete")
                navigate("/dashboard")
            }
        } catch (error) {
            toast.error("Error to deleting event")
        }
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                {event && (
                    <>
                        <h1 className="text-5xl font-bold text-white text-center mb-8">{event.title}</h1>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="rounded-lg overflow-hidden shadow-2xl">
                                {event.images.length > 0 ? (
                                    <img
                                        src={`https://event-managment-56fc.onrender.com${event.images[0]}`}
                                        alt="Event"
                                        className="w-full h-96 object-cover"
                                    />
                                ) : (
                                    <div className="h-96 bg-orange-200 flex items-center justify-center">
                                        <p className="text-orange-800 font-semibold text-xl">Image not available</p>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-lg overflow-hidden shadow-2xl">
                                {event.videos.length > 0 ? (
                                    <video
                                        src={`https://event-managment-56fc.onrender.com${event.videos[0]}`}
                                        controls
                                        className="w-full h-96 object-cover"
                                    />
                                ) : (
                                    <div className="h-96 bg-orange-200 flex items-center justify-center">
                                        <p className="text-orange-800 font-semibold text-xl">Video not available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-8 shadow-xl">
                            <p className="text-white text-lg mb-6">{event.description}</p>

                            <div className="flex flex-wrap gap-6 text-lg mb-8">
                                <div className="flex items-center bg-white bg-opacity-30 px-4 py-2 rounded-full">
                                    <FaCalendarAlt className="w-6 h-6 mr-2 text-white" />
                                    <span className="text-white font-medium">{formatDate(event.date)}</span>
                                </div>
                                <div className="flex items-center bg-white bg-opacity-30 px-4 py-2 rounded-full">
                                    <FaClock className="w-5 h-5 mr-2 text-white" />
                                    <span className="text-white font-medium">{formatTime(event.time)}</span>
                                </div>
                                <div className="flex items-center bg-white bg-opacity-30 px-4 py-2 rounded-full">
                                    <FaMapMarkerAlt className="w-6 h-6 mr-2 text-white" />
                                    <span className="text-white font-medium">{event.location}</span>
                                </div>
                                <div className="flex items-center bg-white bg-opacity-30 px-4 py-2 rounded-full">
                                    <GiTicket className="w-6 h-6 mr-2 text-white" />
                                    <span className="text-white font-medium">${event.ticketPricing}</span>
                                </div>
                                <div className="flex items-center bg-white bg-opacity-30 px-4 py-2 rounded-full">
                                    <FaTag className="w-5 h-5 mr-2 text-white" />
                                    <span className="text-white font-medium">{event.category}</span>
                                </div>
                            </div>

                            {auth.user.role === "Admin" ? (
                                <div className="flex gap-4">
                                    <button onClick={updateEventHandler} className="w-full bg-blue-600 text-white text-xl font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-700 shadow-lg">
                                        Update
                                    </button>

                                    <button onClick={deleteEventHandler} className="w-full bg-red-600 text-white text-xl font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-700 shadow-lg">
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <button onClick={navigateHandler} className="w-full bg-white text-purple-600 text-xl font-bold py-4 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-100 shadow-lg">
                                    Book Now
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default EventDetails;
