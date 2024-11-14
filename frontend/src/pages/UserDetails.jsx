import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const UserDetails = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserData = async () => {
        if (!user?.token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
                headers: {
                    'Authorization': `Token ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            setUserData(response.data);
        } catch (error) {
            setError(error);
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading user data: {error.message}</p>;

    return (
        <div>
            <h2>Detalles del Usuario</h2>
            {userData ? (
                <div>
                    <p><strong>Nombre de Usuario:</strong> {userData.username}</p>
                    <p><strong>Correo Electrónico:</strong> {userData.email}</p>
                    <p><strong>Nombre Completo:</strong> {userData.full_name}</p>
                    <p><strong>Teléfono:</strong> {userData.phone}</p>
                    <p><strong>Rol:</strong> {userData.role}</p>

                    {/* Mostrar botón de "Gestionar Usuarios" si el usuario es Administrador */}
                    {userData.role === "Administrador" && (
                        <button onClick={() => window.location.href = "http://127.0.0.1:8000/admin"}>Gestionar Usuarios</button>
                    )}
                </div>
            ) : (
                <p>No hay datos del usuario disponibles</p>
            )}
        </div>
    );
};

export default UserDetails;
