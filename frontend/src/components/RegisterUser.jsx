import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterUser.css'

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        full_name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/register/', formData);
            alert('User registered successfully');
            setFormData({ username: '', email: '', password: '', phone: '', full_name: '' });
        } catch (error) {
            alert('Error during registration');
        }
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <img src="path/to/defense-logo.png" alt="Ministerio de Defensa" className="logo"/>
                <h1>SICOSE</h1>
                <p>Sistema de Control, Seguimiento y Análisis Estadístico de Mercancía Incautada</p>
                <form onSubmit={handleSubmit} className="register-form">
                    <input type="text" name="full_name" placeholder="Nombre" value={formData.full_name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                    <input type="text" name="phone" placeholder="Celular" value={formData.phone} onChange={handleChange} />
                    <div className="terms">
                        <label>
                            <input type="checkbox" required /> Acepta nuestros <span>términos y condiciones</span>
                        </label>
                    </div>
                    <button type="submit">¡Regístrate!</button>
                </form>
                <p className="login-prompt">¿Ya estás registrado? <a href="/login">Iniciar sesión</a></p>
            </div>
            <div className="register-right">
                <div className="info-text">
                    <h2>Ministerio de Defensa - Bolivia</h2>
                    <p>El Decreto Supremo N°3540 establece...</p>
                </div>
            </div>
        </div>
    );
};

export default RegisterUser;
