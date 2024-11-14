
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Sidebar = () => {
    const { user } = useContext(UserContext);

    return (
        <div className="sidebar">
            <Link to="/dashboard">Inicio</Link>
            {/* Condicional para mostrar 'Incautaciones' solo a Administrador */}
            {user?.role === 'Administrador' && (
                <Link to="/incautaciones">Incautaciones</Link>
            )}
            <Link to="/inventario">Inventario</Link>
            <Link to="/estadisticas">Estadísticas</Link>
            <Link to="/tendencias">Tendencias</Link>
            <Link to="/user-details">Usuario</Link>
        </div>
    );
};

export default Sidebar;
