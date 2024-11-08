"use client"
import { useState } from "react";
import AuthContext from "./AuthContext";

export function AuthProvider ({children}){
const [user,setUser] = useState(null);

// const login = (userData) => {
//     setUser(userData);
// }

    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}