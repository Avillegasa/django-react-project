import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Cargar el token desde localStorage si existe
        const token = localStorage.getItem("userToken");
        if (token) {
            axios.get("http://127.0.0.1:8000/api/users/me/", {
                headers: { Authorization: `Token ${token}` },
            })
            .then(response => {
                // Almacena el token y el rol devuelto por el backend en el contexto
                setUser({ token, role: response.data.role });
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
