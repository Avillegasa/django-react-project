import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            // Intentar obtener el perfil del usuario usando el token
            axios.get('http://127.0.0.1:8000/api/users/me/', {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                setUser({ ...response.data, token }); // Almacenar los datos del usuario junto con el token
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
                localStorage.removeItem("userToken"); // Remover token si es inválido
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
