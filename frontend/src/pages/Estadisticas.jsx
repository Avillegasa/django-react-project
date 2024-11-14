import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
// import '../styles/Estadisticas.css'

const Estadisticas = () => {
    const { user } = useContext(UserContext);

    if(!user){
        return <Navigate to='/'/>;
    }
    
    return (
        <div className='estadisticas'>
            <Sidebar />
            <div className="main-content">
                <h1>Bienvenido a estadisticas</h1>
            </div>
        </div>
    );
};

export default Estadisticas;
