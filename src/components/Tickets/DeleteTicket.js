import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function DeleteTicket() {
    const { ticketId } = useParams();
    const [auth] = useAuth();
    const nevigate = useNavigate();

    // Extract token from auth context
    const token = auth?.token


    // function to handle ticket deletion
    const cancelHandler = async () => {
        try {
            const res = await axios.delete(`https://event-managment-56fc.onrender.com/api/tickets/cancelTicket/${ticketId}`, {
                headers: {
                    Authorization: `Beare ${token}`

                },
            })
            if (res.data) {
                toast.success("delete successful! Your ticket has Delete in two days.");
            }
        } catch (error) {
            toast.error(error.res.data.error || error.res.data.message || "Error to delete")
        }
    }

    // use to navigate back to user ticket page
    const handlerBack = () => {
        nevigate("/userticket")
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex justify-center items-center">
           <div className="bg-white p-20 rounded-lg">
                <button
                    onClick={handlerBack}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition me-6"
                >
                    Back
                </button>
                <button
                    onClick={cancelHandler}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    delete
                </button>
            </div>
        </div>
    )
}

export default DeleteTicket
