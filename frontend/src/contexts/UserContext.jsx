import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Usuario autenticado
    const [selectedCategory, setSelectedCategory] = useState("Predicción General"); // Categoría seleccionada
    const [selectedPeriod, setSelectedPeriod] = useState("month"); // Período seleccionado (mensual por defecto)

    useEffect(() => {
        // Cargar el token desde localStorage si existe
        const token = localStorage.getItem("userToken");
        if (token) {
            axios
                .get("http://127.0.0.1:8000/api/users/me/", {
                    headers: { Authorization: `Token ${token}` },
                })
                .then((response) => {
                    // Almacenar token y rol en el contexto del usuario
                    setUser({ token, role: response.data.role });
                })
                .catch((error) => {
                    console.error("Error fetching user details:", error);
                });
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                selectedCategory,
                setSelectedCategory,
                selectedPeriod,
                setSelectedPeriod,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
