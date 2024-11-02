import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/context/AuthContext';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketType, price, eventId } = location.state || {};
    const [auth] = useAuth();
    
    // Extract token from auth context
    const token = auth?.token

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [quantity, setQuantity] = useState(1);


    // Function to handle quantity changes
    const quantityHandler = (value) => {
        
        if (value > 0) {
            setQuantity(value);
        } else {
            setQuantity(1);
        }
    };


    // Calculate total price based on price and quantity
    const totalPrice = price * quantity;

    
    // Function to handle the payment process
    const handlePayment = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('https://event-managment-56fc.onrender.com/api/payments/payment', {
                amount: totalPrice * 100,
                currency: 'INR',
                price,
                ticketType,
                eventId,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const options = {
                key: process.env.ROZ_KEY_Id,
                amount: data.amount,
                currency: data.currency,
                name: 'Event Ticket',
                description: `Payment for ${ticketType}`,
                order_id: data.id,
                handler: async (response) => {
                    // Verify the payment
                    const verifyResponse = await axios.post('https://event-managment-56fc.onrender.com/api/payments/paymentVerify', {
                        paymentId: response.razorpay_payment_id,
                        orderId: data.id,
                        ticketType,
                        totalPrice,
                        price,
                        eventId,
                        quantity
                    }, {
                        headers: {
                            'x-razorpay-signature': response.razorpay_signature,
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (verifyResponse.data.success) {
                        setMessage('Payment successful! Your ticket has been booked.');
                        setTimeout(() => navigate(`/userticket`), 3000);
                    } else {
                        setMessage('Payment verification failed. Please try again.');
                    }
                },
                theme: {
                    color: '#F37254',
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Payment for {ticketType}</h1>
                <p className="mb-4">Price: <span className="font-bold">₹{price}</span></p>
                <p className="mb-4">TotalPrice: <span className="font-bold">₹{totalPrice}</span></p>
                <p className="mb-4">Ticket Type: <span className="font-bold">{ticketType}</span></p>
                <input
                    type='number'
                    placeholder='Quantity'
                    value={quantity}
                    min="1" 
                    onChange={(e) => quantityHandler(e.target.value)} 
                    className="border border-gray-300 rounded p-2 mb-4"
                />
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
                {message && <p className="mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default PaymentPage;
