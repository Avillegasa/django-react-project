import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';
import { fetchPrediction } from '../services/predictions';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import UserIcon from '../assets/icons/usericon.png';

const Tendencias = () => {
    const { user } = useContext(UserContext);
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPrediction = async () => {
            try {
                const data = await fetchPrediction();
                setPrediction(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPrediction();
    }, []);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (loading) return <p>Cargando...</p>;

    if (error) return <p>Error: {error}</p>;

    const chartData = [
        { name: 'Cantidad Predicha', value: prediction.predicted_quantity },
    ];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenido Principal */}
            <div className="flex-1 flex flex-col">
                {/* Barra Superior */}
                <div className="bg-[#ECF0F1] border-b border-black flex items-center justify-between px-6 py-3">
                    <h1 className="text-xl tracking-[0.5em] font-bold text-black">
                        SICOSE
                    </h1>
                    <Link to="/user-details">
                        <img
                            src={UserIcon}
                            alt="Usuario"
                            className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
                        />
                    </Link>
                </div>

                {/* Contenido del Módulo */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Tendencias y Análisis Predictivo</h1>
                    <p className="mb-4 text-lg">
                        <span className="font-semibold">Fecha futura:</span> {prediction.future_date}
                    </p>
                    <BarChart width={500} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Tendencias;
