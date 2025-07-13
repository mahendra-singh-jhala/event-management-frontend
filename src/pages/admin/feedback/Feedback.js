import { useEffect, useState } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../../../api/API";

function Feedback() {
    const [feedback, setfeedback] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    // useEffect to Fetch feedback data
    useEffect(() => {
        const fetchfeeback = async () => {
            try {
                const res = await api.get("/api/feedback")
                setfeedback(res.data)
            } catch (error) {
                console.log("Error to fetch event", error)
            }
        }
        fetchfeeback()
    }, [])

    // Function to move to the next feedback
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
    };

    // Function to move to the previous feedback
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + feedback.length) % feedback.length);
    };

    return (
        <div className="w-full bg-gradient-to-t from-sky-200 p-10">
            <div className="relative w-full max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center mb-4">Feedback</h2>
            {feedback.length > 0 ? (
                <div className="flex items-center overflow-hidden rounded-lg shadow-lg">
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 z-10 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700"
                    >
                        <FaChevronLeft size={20} /> 
                    </button>
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {feedback.map(feedback => (
                            <div key={feedback._id} className="flex-shrink-0 w-full p-4 text-center bg-gray-100">
                                <h1 className="font-bold text-xl">{feedback.firstname} {feedback.lastname}</h1>
                                <p>{feedback.description}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 z-10 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-700"
                    >
                        <FaChevronRight size={20} />
                    </button>
                </div>
            ) : (
                <p>No feedback available.</p>
            )}
        </div>
        </div>
    )
}

export default Feedback
