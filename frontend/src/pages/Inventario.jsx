import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
// import '../styles/Inventario.css'

const Inventario = () => {
    const { user } = useContext(UserContext);

    if(!user){
        return <Navigate to='/' />;
    }
    
    return (
        <div className='inventario'>
            <Sidebar />
            <div className='main-content'>
                <h1>Modulo de Busqueda</h1>
            </div>
        </div>
    );
};

export default Inventario;
