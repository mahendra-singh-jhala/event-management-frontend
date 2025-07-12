import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaCrown, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/API';

const TicketSelectionPage = () => {
    const [tickets, setTickets] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()


    // Function to handle ticket selection and navigate to payment page
    const navigateHandler = (ticketType, price) => {
        navigate(`/payment/${id}`, {
            state: {
                ticketType,
                price,
                eventId: id

            }
        });
    }


    // useEffect to fetch tickets when id changes
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await api.get(`/api/tickets/event/${id}`);
                setTickets(response.data);
            } catch (error) {
                console.log("Error to fetching ticket", Error)
            }
        };

        fetchTickets();
    }, [id]);


    // Find VIP and General Admission tickets from the fetched tickets
    const vipTicket = tickets.find(ticket => ticket.ticketTypes === 'VIP');
    const generalTicket = tickets.find(ticket => ticket.ticketTypes === 'General Admission');

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white text-center mb-10">Select Your Tickets</h1>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl">
                        <div className="flex items-center mb-4">
                            <FaCrown className="w-8 h-8 mr-3 text-yellow-400" />
                            <h2 className="text-3xl font-bold text-white">VIP Ticket</h2>
                        </div>
                        {vipTicket ? (
                            <>
                                <p className="text-white text-xl mb-4">₹{vipTicket.price}</p>
                                <ul className="text-white mb-6">
                                    <li>✓ Premium seating</li>
                                    <li>✓ Exclusive merchandise</li>
                                    <li>✓ Meet & Greet opportunity</li>
                                </ul>
                                <button onClick={() => navigateHandler('VIP', vipTicket.price)} className="w-full bg-yellow-400 text-purple-800 text-xl font-bold py-3 px-4 rounded-lg hover:bg-yellow-300 transition duration-300">
                                    Book VIP Ticket
                                </button>
                            </>
                        ) : (
                            <p className="text-white text-xl">VIP tickets are not available for this event.</p>
                        )}
                    </div>

                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-xl">
                        <div className="flex items-center mb-4">
                            <FaUser className="w-8 h-8 mr-3 text-blue-400" />
                            <h2 className="text-3xl font-bold text-white">General Ticket</h2>
                        </div>
                        {generalTicket ? (
                            <>
                                <p className="text-white text-xl mb-4">₹{generalTicket.price}</p>
                                <ul className="text-white mb-6">
                                    <li>✓ Standard seating</li>
                                    <li>✓ Access to main event</li>
                                    <li>✓ General amenities</li>
                                </ul>
                                <button onClick={() => navigateHandler('General', generalTicket.price)} className="w-full bg-blue-400 text-white text-xl font-bold py-3 px-4 rounded-lg hover:bg-blue-300 transition duration-300">
                                    Book General Ticket
                                </button>
                            </>
                        ) : (
                            <p className="text-white text-xl">General tickets are not available for this event.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketSelectionPage;