import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import toast from "react-hot-toast";
import api from "../../api/API";

function Dashbord() {
    const location = useLocation();
    const [events, setEvents] = useState([])
    const [users, setUsers] = useState([])
    const [tickets, setTickets] = useState([])
    const [soldTickets, setsoldTickets] = useState([])
    const [totalTickets, setTotalTickets] = useState(0);
    const [totalsoldTickets, setTotalsoldTickets] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [pendingEvent, setpendingEvent] = useState([]);
    const navigate = useNavigate();

    // Check which page is currently active based on the path
    const isEventsPage = location.pathname.includes("event");
    const isMessagePage = location.pathname.includes("getQuery");
    const isCalendarPage = location.pathname.includes("calendar");
    const isProfilePage = location.pathname.includes("adminProfile");
    const isTicketPage = location.pathname.includes("tickets");

    // useEffect to Fetch events 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get("/api/events")
                setEvents(res.data?.events);
            } catch (error) {
                console.log("Error to fetching event", error)
            }
        }
        fetchEvents()
    }, [])

    // Filter upcoming events based on the current date
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        return eventDate >= currentDate;
    });

    // useEffect to Fetch sold tickets
    useEffect(() => {
        const fetchSoldTickets = async () => {
            try {
                const res = await api.get("/api/tickets/userAllTickets")
                setsoldTickets(res.data?.allTicket)
            } catch (error) {
                console.log('Error fetching Sold tickets. Please try again later', error);
            }
        }
        fetchSoldTickets();
    }, [])


    // Calculate total sold tickets and revenue whenever soldTickets updates
    useEffect(() => {
        const total = soldTickets.reduce((acc, ticket) => {
            return {
                count: acc.count + ticket.quantity,
                price: acc.price + ticket.totalPrice
            };
        }, { count: 0, price: 0 });

        setTotalsoldTickets(total.count);
        setTotalPrice(total.price);
    }, [soldTickets]);


    // useEffect to Fetch tickets
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await api.get("/api/tickets/ticket")
                setTickets(res.data?.tickets);
            } catch (error) {
                console.log('Error fetching tickets. Please try again later', error);
            }
        }
        fetchTickets()
    }, [])


    // Calculate total tickets whenever tickets updates
    useEffect(() => {
        const totals = tickets.reduce((acc, ticket) => {
            return {
                count: acc.count + ticket.quantity
            };
        }, { count: 0 });

        setTotalTickets(totals.count);
    }, [tickets]);


    // useEffect to Fetch all users 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/api/user/getAllprofile")
                setUsers(res.data?.user)
            } catch (error) {
                console.log("Error to fetching user", error)
            }
        }
        fetchUser()
    }, [])


    // Prepare chart data for the BarChart component
    const chartData = [
        {
            name: 'Users',
            value: users.length,
        },
        {
            name: 'Tickets Sold',
            value: totalsoldTickets,
        },
        {
            name: 'Revenue',
            value: totalPrice,
        },
    ];


    // useEffect to Fetch pending events
    useEffect(() => {
        const fetchPendingEvent = async () => {
            try {
                const res = await api.get("/api/events/pending")
                setpendingEvent(res.data?.pendingEvents);
            } catch (error) {
                console.error('Error fetching pending events', error);
            }
        }
        fetchPendingEvent();
    }, [])


    // useEffect handle event approval or rejection
    const handleApprove = async (eventId, isApproved) => {
        try {
            const res = await api.patch(`/api/events/${eventId}/approve`, {
                status: isApproved ? "approved" : "rejected"
            })
            if(res.data) {
                toast.success("Approve successful");
                navigate(`/event/${eventId}`)
            }
        } catch (error) {
            toast.error("Error approve pending events")
        }
    }

    // Calculate remaining tickets
    const remainingTickets = totalTickets - totalsoldTickets

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link to="/eventForm">
                            <button className="bg-red-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 shadow-lg">CREATE NEW EVENT</button>
                        </Link>
                        <Link to="/createTicket">
                            <button className="bg-red-500 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 shadow-lg">CREATE NEW TICKETS</button>
                        </Link>
                        <span className="text-gray-600 font-bold"><strong>REVENUE :</strong> ₹{totalPrice}</span>
                    </div>
                </div>
            </header>

            <nav className="bg-gray-900 text-white">
                <div className="container mx-auto px-4 py-2 flex flex-wrap space-x-4">
                    <Link to="" className="py-2 px-4 hover:border-b-4 hover:border-red-500">DASHBOARD</Link>
                    <Link to="event" className="py-2 px-4 hover:border-b-4 hover:border-red-500">EVENTS</Link>
                    <Link to="getQuery" className="py-2 px-4 hover:border-b-4 hover:border-red-500">MESSAGES</Link>
                    <Link to="calendar" className="py-2 px-4 hover:border-b-4 hover:border-red-500">CALENDAR</Link>
                    <Link to="adminProfile" className="py-2 px-4 hover:border-b-4 hover:border-red-500">PROFILE</Link>
                    <Link to="tickets" className="py-2 px-4 hover:border-b-4 hover:border-red-500">ALL TICKETS</Link>
                </div>
            </nav>

            <main className="flex-grow">
                {isEventsPage || isCalendarPage || isMessagePage || isProfilePage || isTicketPage ? (
                    <Outlet />
                ) : (
                    <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl col-span-2">
                            <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white max-h-screen overflow-y-auto p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">USERS</h2>
                            <ul>
                                {users.length === 0 ? (
                                    <p>User not found</p>
                                ) : (
                                    users.map(user => (
                                        <li key={user._id} className="w-full bg-orange-500 p-3 bg-opacity-50 hover:bg-orange-400 flex items-center rounded mb-4 transition duration-300 ease-in-out hover:scale-105">
                                            <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                                            <div>
                                                <h2 className="text-xl font-semibold">{user.firstName} {user.lastname}</h2>
                                                <p className="text-sm text-gray-600 font-semibold">{user.email}</p>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="bg-white max-h-screen overflow-y-auto p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-4">UPCOMING EVENTS</h2>
                            <ul>
                                {upcomingEvents.length === 0 ? (
                                    <p>No upcoming events found.</p>
                                ) : (
                                    upcomingEvents.map(event => (
                                        <Link key={event._id} to={`/event/${event._id}`}>
                                            <li className="bg-sky-400 bg-opacity-40 mb-2 rounded p-4 transform transition duration-300 ease-in-out hover:bg-sky-500 hover:scale-105">
                                                <div className="flex items-center space-x-4">
                                                    <img src={`http://localhost:5000${event.images}`} alt="EventImage" className="rounded-full w-10 h-10" />
                                                    <div className="text-xs">
                                                        <p className="font-semibold">{event.title}</p>
                                                        <p className="text-gray-600"><strong>Location: </strong>{event.location}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    ))
                                )}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl col-span-2">
                            <h2 className="text-lg font-semibold mb-4">TOTAL SELLS</h2>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-gray-500">Total Ticket Sell</p>
                                    <p className="text-red-500 text-2xl">{totalsoldTickets}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {soldTickets.length === 0 ? (
                                    <p>No ticket found</p>
                                ) : (
                                    <div>
                                        {soldTickets.map(ticket => (
                                            <div key={ticket._id} className="flex justify-between items-center bg-orange-500 p-3 bg-opacity-50 hover:bg-orange-400 rounded mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div>
                                                        <p className="font-semibold">{ticket.email}</p>
                                                        <p className="text-gray-600"><strong>EventID: </strong>{ticket.eventId}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <p className="text-gray-600 font-bold">x{ticket.quantity}</p>
                                                    <p className="text-gray-600 font-bold">₹{ticket.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl">
                            <h2 className="text-lg font-semibold mb-4">TOTAL TICKETS</h2>
                            <div className="flex justify-center items-center mb-4">
                                <div className="text-center">
                                    <p className="text-4xl font-bold">{remainingTickets}</p>
                                    <p className="text-gray-500">Tickets</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Total Ticket</p>
                                <p className="text-gray-500">{totalTickets}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-500">Sold Ticket</p>
                                <p className="text-red-500">{totalsoldTickets}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-xl col-span-2 max-h-screen overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-4">REQUEST PENDING EVENTS</h2>
                            <ul>
                                {pendingEvent.map(event => (
                                    <li key={event._id}>
                                        <div className="flex items-center justify-between bg-orange-500 p-3 bg-opacity-50 hover:bg-orange-400 rounded mb-3">
                                            <div className="flex items-center space-x-4">
                                                <img src={`http://localhost:5000${event.images}`} alt="EventImage" className="rounded-full w-10 h-10" />
                                                <div className="text-xs">
                                                    <p className="font-semibold">{event.title}</p>
                                                    <p className="text-gray-600"><strong>Location: </strong>{event.location}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <button onClick={() => handleApprove(event._id, true)} className="bg-green-600 text-white font-bold rounded transition duration-300 ease-in-out transform hover:bg-green-700 hover:scale-105 shadow-lg p-2 me-4">Approve</button>
                                                <button onClick={() => handleApprove(event._id, false)} className="bg-red-600 text-white font-bold rounded transition duration-300 ease-in-out transform hover:bg-red-700 hover:scale-105 shadow-lg p-2 me-4">Reject</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
                <p className="text-gray-400">&copy; Copyright 2024. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Dashbord
