import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TicketForm = () => {
    const [formData, setFormData] = useState({
        ticketTypes: "",
        price: "",
        quantity: "",
    });
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedEventTitle, setSelectedEventTitle] = useState('');


    // useEffect to fetch event
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get("https://event-managment-56fc.onrender.com/api/events");
                setEvents(res.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };
        fetchEvents();
    }, []);


    // Handle changes to the selected event
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // function handle changes to the selected event
    const handleEventChange = (e) => {
        const eventId = e.target.value;
        setSelectedEvent(eventId);

        // Fetch the selected event's price
        const selectedEvent = events.find(event => event._id === eventId);
        if (selectedEvent) {
            setSelectedEventTitle(selectedEvent.title);
            setFormData(prevState => ({
                ...prevState,
                price: selectedEvent.ticketPricing 
            }));
        } else {
            setSelectedEventTitle('');
            setFormData(prevState => ({
                ...prevState,
                price: "" // Reset price if no event is selected
            }));
        }
    };

    // handle to ticket type change
    const handleTicketTypeChange = (e) => {
        const selectedType = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            ticketTypes: selectedType,
            price: selectedType === "VIP" ? "" : events.find(event => event._id === selectedEvent)?.ticketPricing || ""
        }))
    }


    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const ticketData = {
            eventId: selectedEvent,
            ticketTypes: formData.ticketTypes,
            price: formData.price,
            quantity: formData.quantity
        };

        try {
            const res = await axios.post("https://event-managment-56fc.onrender.com/api/tickets/create-ticket", ticketData);
            if(res.data) {
                toast.success("Ticket Created successfully ");
            }
            // Clear form after submission
            setSelectedEvent('');
            setFormData({
                ticketTypes: "",
                price: "",
                quantity: "",
            });
            
        } catch (error) {
            toast.error("Error creating ticket")
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-8">Create Ticket</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Event:</label>
                        <select
                            value={selectedEvent}
                            onChange={handleEventChange}
                            required
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none "
                        >
                            <option value="">Select an event</option>
                            {events.map(event => (
                                <option key={event._id} value={event._id}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedEventTitle && (
                        <div className="mt-2">
                            <strong>Selected Event Title: </strong>
                            <span>{selectedEventTitle}</span>
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Ticket Types:</label>
                        <select
                            name="ticketType"
                            value={formData.ticketTypes}
                            onChange={handleTicketTypeChange}
                            required
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        >
                            <option value="">Select a type</option>
                            <option value="VIP">VIP</option>
                            <option value="General Admission">General Admission</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            readOnly={formData.ticketTypes !== "VIP"}
                            placeholder="Change Price For VIP"
                            required
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform"
                    >
                        Create Ticket
                    </button>
                </form>
            </div>
        </section>
    );
};

export default TicketForm
