import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginUser.css';

const LoginUser = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/users/login/', formData);
            alert('Login successful');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src="path/to/defense-logo.png" alt="Ministerio de Defensa" className="logo" />
                <h1>SICOSE</h1>
                <p>Sistema de Control y Seguimiento</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="text" name="username" placeholder="Correo electrónico" value={formData.username} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p className="register-prompt">¿Aún no estás registrado? <a href="/register">¡Regístrate!</a></p>
            </div>
            <div className="login-right">
                <div className="info-text">
                    <h2>Ministerio de Defensa - Bolivia</h2>
                    <p>El Decreto Supremo N°3540 establece...</p>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;
