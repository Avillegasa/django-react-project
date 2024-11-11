import React, { useState } from 'react';
import axios from 'axios';

const LoginUser = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [token, setToken] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', formData);
            setToken(response.data.token);
            alert('Logged in successfully');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <button type="submit">Login</button>
            {token && <p>Token: {token}</p>}
        </form>
    );
};

export default LoginUser;
