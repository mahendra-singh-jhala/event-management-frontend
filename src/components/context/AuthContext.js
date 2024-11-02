import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user:null,
        token:"",
        role: ""
    })

    useEffect(() => {
        const data = localStorage.getItem("auth")
        if (data) {
            const parseData = JSON.parse(data);
            setAuth(prevAuth => ({
                ...prevAuth, 
                user: parseData.user,
                token: parseData.token,
                role: parseData.role,
            }));
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}