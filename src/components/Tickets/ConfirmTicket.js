import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const ConfirmTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [auth] = useAuth();
    const navigate = useNavigate();
    
    // Extract token from auth context
    const token = auth?.token


    // useEffect hook to fetch tickets
    useEffect(() => {
        const fetchTickets = async () => {
            try {

                const res = await axios.get('https://event-managment-56fc.onrender.com/api/tickets/userTicket', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data) {
                    setTickets(res.data);
                }
            } catch (error) {
                toast.error("Error to fetch Ticket")
            }
        };
        fetchTickets();
    }, [token]);


    // Use navigate to go to the event details page
    const handleViewEvent = (eventId) => {
        navigate(`/event/${eventId}`);
    };

    // Use navigate to go to the cancel ticket page
    const handleCancel = (ticketId) => {
        navigate(`/cancelTicket/${ticketId}`);
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6" >
                <h1 className="text-3xl font-bold mb-4 text-center">Your Tickets</h1>
                {
                    tickets.length > 0 ? (
                        <ul className="space-y-4">
                            {tickets.map((ticket) => (
                                <li key={ticket._id} className="border border-gray-300 rounded-lg p-4 shadow-md">
                                    <div className="mb-2">
                                        <strong>Type:</strong> {ticket.ticketType}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Total Price:</strong> ₹{ticket.totalPrice}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Price:</strong> ₹{ticket.price}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Event ID:</strong> {ticket.eventId}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Date Purchased:</strong> {new Date(ticket.datePurchased).toLocaleString()}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Quantity:</strong> {ticket.quantity}
                                    </div>
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={() => handleViewEvent(ticket.eventId)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                        >
                                            View Event
                                        </button>
                                        <button
                                            onClick={() => handleCancel(ticket._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center">No tickets found.</p>
                    )
                }
            </div>
        </div>
    );
};

export default ConfirmTicket;