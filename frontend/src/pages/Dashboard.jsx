import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
// import '../styles/Dashboard.css'

const Dashboard = () => {
    const { user } = useContext(UserContext);

    //Redirige al login si no hay un usuario autenticado
    if(!user){
        return <Navigate to="/" />;
    }

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className="main-content">
                <h1>Bienvenido al Sistema de Control y Seguimiento, es decir el inicio</h1>
            </div>
        </div>
    );
};

export default Dashboard;
