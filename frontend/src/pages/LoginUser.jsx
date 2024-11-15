// LoginUser.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginUser.css';
import DefenseLogo from '../assets/images/logo.jpeg';
import { UserContext } from '../contexts/UserContext';

const LoginUser = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/users/login/',
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const { token, role } = response.data;
            localStorage.setItem("userToken", token);

            // Almacena el token y el rol en el contexto de usuario
            setUser({ token, role });
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response);
                alert(`Login error: ${error.response.data.error}`);
            } else {
                console.error("Error:", error);
                alert('Error durante el inicio de sesión');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src={DefenseLogo} alt="Ministerio de Defensa" className="logo" />
                <h1>SICOSE</h1>
                <p>Sistema de Control y Seguimiento</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
            <div className="login-right">
                <h2>Ministerio de Defensa - Bolivia</h2>
                <p>El Decreto Supremo N°3540 establece...</p>
            </div>
        </div>
    );
};

export default LoginUser;
