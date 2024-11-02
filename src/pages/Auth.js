import { useEffect, useState } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const IsAuth = () => {
    const { token } = useParams();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);


    // useEffect to run the authentication check
    useEffect(() => {
        const getAccess = async () => {
            try {
                const res = await axios.post(`https://event-managment-56fc.onrender.com/api/auth/get-access/${token}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.status === 200) {
                    setAuth(true);
                }
            } catch (error) {
                if (error.response) {
                    
                    toast.error(error.response.data.error || error.response.data.message || "An error occurred");
                } else {
                    
                    toast.error("Failed due to a network error");
                    console.error(error.message);
                }
            } finally {
                setLoading(false); 
            }
        };

        getAccess();
    }, [token]);

    if (loading) {
        return <h2>Loading...</h2>
    }

    return auth ? <Outlet /> : <Navigate to="/login" />; 
};

export default IsAuth;