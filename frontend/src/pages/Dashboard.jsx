import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
import '../styles/Dashboard.css'

const Dashboard = () => {
    const { user } = useContext(UserContext);

    //Redirige al login si no hay un usuario autenticado
    if(!user){
        return <Navigate to="/" />;
    }

    return (
        <div className='dashboard-container'>
            <Sidebar />
            <div className="main-content">
                <h1>Viceministerio de Lucha Contra el Contrabando</h1>
                <div className='image-container'>
                    <img src="ruta-imagen" alt="Imagen de lucha contra el contrabando" />
                    <p>VLCC - El Decreto Supremo N°3540 establece...</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
