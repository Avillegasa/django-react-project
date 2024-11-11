import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input type="text" name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterUser;
