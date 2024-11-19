import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
// import '../styles/Tendencias.css'

const Tendencias = () => {
    const { user } = useContext(UserContext);

    if(!user){
        return <Navigate to='/' />;
    }
    
    return (
        <div className='tendencias'>
            <Sidebar />
            <div className='main-content'>
                <h1>Modulo de tendencias y analisis predictivo</h1>
            </div>
        </div>
    );
};

export default Tendencias;
