import { useEffect, useState } from "react";
import api from "../../api/API";

const TicketList = () => {
	const [tickets, setTickets] = useState([]);
	const [filterTickets, setFilterTickets] = useState("");


	// useEffect to fetch tickets
	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const response = await api.get('/api/tickets/ticket');
				setTickets(response.data);
			} catch (error) {
				console.log("Error to fetching ticket", error)
			}
		};
		fetchTickets();
	}, []);


	 // function handle changes in the filter input
	const handleFilterTicket = (e) => {
		setFilterTickets(e.target.value);
	};

	// Filter tickets based on the filter input
	const filteredTickets = tickets.filter(ticket =>
		ticket.eventId.title.toLowerCase().includes(filterTickets.toLowerCase()) ||
		ticket.eventId.location.toLowerCase().includes(filterTickets.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-center text-2xl font-bold mb-4">View All Tickets</h1>
			<input
				type="text"
				placeholder="Search ticket by title or location"
				value={filterTickets}
				onChange={handleFilterTicket}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 mx-auto my-8"
			/>

			{filteredTickets.length === 0 ? (
				<p>No tickets available.</p>
			) : (
				<ul className="space-y-4">
					{filteredTickets.map((ticket) => (
						<li key={ticket._id} className="bg-white border p-4 rounded-lg">
							<h2 className="text-xl font-semibold">{ticket.eventId.title}</h2>
							<p>Type: {ticket.ticketTypes}</p>
							<p>Price: ${ticket.price}</p>
							<p>Date: {new Date(ticket.eventId.date).toLocaleDateString()}</p>
							<p>Time: {ticket.eventId.time}</p>
							<p>Location: {ticket.eventId.location}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};


export default TicketList;
