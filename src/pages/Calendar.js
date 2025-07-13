import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/API';

function Calendar() {
    const [events, setEvents] = useState([]);

    // useEffect to fetch events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get("/api/events");
                setEvents(res.data);
            } catch (error) {
                console.log("Error fetching events", error);
            }
        };
        fetchEvents();
    }, [token]);

    // Function to format time
    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(`1970-01-01T${timeString}`).toLocaleTimeString(undefined, options);
    };

    // Render the FullCalendar component
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventContent={renderEventContent}
        />
    );

    // Function to render custom content for each event
    function renderEventContent(eventInfo) {
        return (
            <Link key={eventInfo.event.extendedProps._id} to={`/event/${eventInfo.event.extendedProps._id}`}>
                <div className="bg-blue-500 text-white border border-blue-700 rounded-lg p-2 m-1 shadow-md">
                    <div className='w-full font-bold text-wrap'><strong>Title: </strong>{eventInfo.event.title}</div>
                    <div className='w-full text-wrap'><strong>Location: </strong>{eventInfo.event.extendedProps.location}</div>
                    <div className='w-full text-wrap'><strong>Time: </strong>{formatTime(eventInfo.event.extendedProps.time)}</div>
                </div>
            </Link>
        );
    }
}

export default Calendar;