import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/API";

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;

    // useEffect to fetch events 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get("/api/events");
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        }
        fetchEvents();
    }, []);


    // Function to handle search input changes
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    // Filter events based on title and location
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase())
    );

    // Function to handle page changes
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    // Calculate the number of events to display
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    // Calculate total pages
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    // contain all page numbers for the pagination button
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumbers.push(i);
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search events by title or location"
                    value={search}
                    onChange={handleSearch}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 mx-auto my-8"
                />

                {currentEvents.length > 0 ? (
                    <ul className="flex flex-wrap justify-evenly">
                        {currentEvents.map(event => (
                            <Link key={event._id} to={`/event/${event._id}`}>
                                <li className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4 mx-4 px-4 py-4 transform transition duration-500 hover:scale-90">
                                    <div>
                                        {event.images.length > 0 && (
                                            <div className="w-full h-40 overflow-hidden">
                                                {event.images.map((image, index) => (
                                                    <img key={index} src={`https://event-managment-56fc.onrender.com${image}`} alt={`Uploaded img ${index}`} className="object-cover w-full h-full" />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="font-bold text-xl mt-2">{event.title}</h2>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-800 font-semibold"><strong className="text-md">Location: </strong> {event.location}</p>
                                        <p className="text-sm text-gray-800 font-semibold"><strong className="text-md">Date: </strong> {event.date}</p>
                                        <p className="text-sm text-gray-800 font-semibold"><strong className="text-md">Price: </strong> ₹{event.ticketPricing}</p>
                                    </div>
                                </li>
                            </Link>

                        ))}
                    </ul>
                ) : (
                    <p>Event Not Found</p>
                )}
            </div>

            <div className='flex justify-center'>
                {paginationNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                        className={`py-2 px-3 rounded my-4 mx-2 ${currentPage === pageNumber ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>

        </div>

    );
};

export default EventList;
