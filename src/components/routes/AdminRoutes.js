import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom"
import axios from "axios";
import Loading from "./Loading";


function AdminRoutes() {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false)

    const token = auth?.token

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get("https://event-managment-56fc.onrender.com/api/auth/admin-check", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.data.ok){
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if(token) authCheck()
    }, [token])

    return ok ? <Outlet /> : <Loading />
}

export default AdminRoutes
