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
        <div>
            <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-button">Register</button>
            </form>
            </div>
        </div>
        
        
    );
};

export default RegisterUser;
