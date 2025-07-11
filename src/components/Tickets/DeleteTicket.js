import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function DeleteTicket() {
    const { ticketId } = useParams();
    const [email, setEmail] = useState("");
    const [paymentID, setPaymentID] = useState("")
    const [auth] = useAuth();
    const nevigate = useNavigate();

    // Extract token from auth context
    const token = auth?.token


    // function to handle ticket deletion
    const cancelHandler = async (e) => {
        e.preventDefault(); 
        const user = { email, paymentID }
        try {
            const res = await axios.delete(`https://event-managment-56fc.onrender.com/api/tickets/cancelTicket/${ticketId}`, {
                headers: {
                    Authorization: `Bearer ${token}`

                },
                data: user
            })
            if (res.data) {
                toast.success("delete successful! Your ticket has Delete in two days.");
                nevigate("/userticket")
                setEmail("");
                setPaymentID("")
            }
        } catch (error) {
            toast.error("Error to delete")
        }
    }

    // use to navigate back to user ticket page
    const handlerBack = () => {
        nevigate("/userticket")
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex justify-center items-center">
            <div className="w-1/3 bg-white p-10 rounded-lg">
            <h1 className="font-bold text-3xl text-center mb-2">Cancel Your Ticket</h1>
            <p className="text-center text-gray-600 text-xs mb-4">Please enter your register email end enter your paymentID send by email when you buy ticket</p>
                <form onSubmit={cancelHandler} className="mt-8">
                    <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900"> Email </label>
                        <input
                            type="email"
                            placeholder="Enter Register Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900"> PaymentID </label>
                        <input
                            type="text"
                            placeholder="Enter PaymentID"
                            value={paymentID}
                            onChange={(e) => setPaymentID(e.target.value)}
                            className="bg-gray-50 border border-gray-300 rounded-lg p-2 w-full outline-none"
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition my-4"
                    >
                        Delete
                    </button>
                </form>
                <button
                    onClick={handlerBack}
                    className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition me-6"
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default DeleteTicket
