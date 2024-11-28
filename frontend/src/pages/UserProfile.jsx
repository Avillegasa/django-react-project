import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const UserProfile = () => {
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
                    headers: { Authorization: `Token ${user.token}` },
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        };
        fetchUserData();
    }, [user]);

    const handleUserManagement = () => {
        navigate('/manage-users');
    };

    return (
        <div>
            <h2>Mi Perfil</h2>
            {userData ? (
                <div>
                    <p><strong>Nombre:</strong> {userData.full_name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Teléfono:</strong> {userData.phone}</p>
                    <p><strong>Rol:</strong> {userData.role}</p>
                    {userData.role === 'Administrador' && (
                        <button onClick={handleUserManagement}>Gestionar Usuarios</button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
