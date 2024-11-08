import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/RegisterUser.css'

const RegisterUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/register/', formData);
            console.log('User registered successfully:', response.data);
            // Clear form and error message on successful registration
            setFormData({ username: '', email: '', password: '' });
            setError('');
            alert("Usuario registrado con éxito.");
        } catch (error) {
            // Check if the error is about email being already used
            if (error.response && error.response.data.email) {
                alert("Este correo electrónico ya está en uso. Por favor, usa uno diferente.");
            } else {
                // General error handling
                setError('Error en el registro. Intenta nuevamente.');
            }
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h1>Ministerio de Defensa</h1>
                <p>Sistema de Control, Seguimiento y Análisis Estadístico de Mercancía Incautada por el Viceministerio de Lucha Contra el Contrabando</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Celular"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" required /> Acepta nuestros términos y condiciones
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="register-button">Regístrate</button>
                </form>
                <p className="login-prompt">¿Ya estás registrado? <a href="/login">Iniciar sesión</a></p>
            </div>
        </div>
    );
};

export default RegisterUser;
