import axios from 'axios';
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Prediccion General"); // Categoria seleccionada
    const [selectedPeriod, setSelectedPeriod] = useState("month"); // Periodo seleccionado (mensual por defecto)

    useEffect(() => {
        // Cargar el token desde localStorage si existe
        const token = localStorage.getItem("userToken");
        if (token) {
            // Hacer la solicitud con el token de autenticación
            axios.get("http://127.0.0.1:8000/api/users/me/", {
                headers: { Authorization: `Token ${token}` },
            })
            .then(response => {
                // Almacenar el token y el rol devuelto por el backend en el contexto
                setUser({ token, role: response.data.role });
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, selectedCategory, setSelectedCategory, selectedPeriod, setSelectedPeriod }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
