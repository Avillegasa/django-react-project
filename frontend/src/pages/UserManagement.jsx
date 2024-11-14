import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

const UserManagement = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'Operador',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                    headers: { Authorization: `Token ${user.token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [user]);

    const handleInputChange = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', newUser, {
                headers: { Authorization: `Token ${user.token}` },
            });
            setUsers([...users, response.data]);
            setNewUser({ username: '', email: '', password: '', role: 'Operador' });
            alert("Usuario creado con éxito");
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Error al crear usuario");
        }
    };

    const handleEditUser = async (userId) => {
        const editedUser = users.find((u) => u.id === userId);
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}/`, editedUser, {
                headers: { Authorization: `Token ${user.token}` },
            });
            setUsers(users.map((u) => (u.id === userId ? response.data : u)));
            alert("Usuario actualizado con éxito");
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error al actualizar usuario");
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/users/${userId}/`, {
                headers: { Authorization: `Token ${user.token}` },
            });
            setUsers(users.filter((u) => u.id !== userId));
            alert("Usuario eliminado con éxito");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error al eliminar usuario");
        }
    };

    return (
        <div>
            <h2>Gestión de Usuarios</h2>
            <form onSubmit={handleAddUser}>
                <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                />
                <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                >
                    <option value="Administrador">Administrador</option>
                    <option value="Operador">Operador</option>
                    <option value="Analista">Analista</option>
                </select>
                <button type="submit">Agregar Usuario</button>
            </form>

            <div>
                {users.map((user) => (
                    <div key={user.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
                        <p><strong>Nombre:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Rol:</strong> {user.role}</p>
                        <button onClick={() => handleEditUser(user.id)}>Editar</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
