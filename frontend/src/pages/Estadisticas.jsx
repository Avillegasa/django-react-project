import axios from 'axios';
import "chart.js/auto";
import React, { useContext, useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../assets/icons/usericon.png";
import Sidebar from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext';

const Estadisticas = () => {
    const { user } = useContext(UserContext);
    const [comisos, setComisos] = useState({});
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [allData, setAllData] = useState({});

    // Obtener datos del backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/all-comisos/", {
                    headers: { Authorization: `Token ${user.token}` },
                });
                console.log("Datos obtenidos del backend:", response.data); // Para depuración
                setAllData(response.data);
                filterDataByYear(response.data, anio);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    // Filtrar datos por año seleccionado
    const filterDataByYear = (data, selectedYear) => {
        const filteredData = Object.keys(data).reduce((acc, categoria) => {
            acc[categoria] = data[categoria].filter(item => item.anio === selectedYear);
            return acc;
        }, {});
        setComisos(filteredData);
    };

    const handleYearChange = (e) => {
        const selectedYear = parseInt(e.target.value);
        setAnio(selectedYear);
        filterDataByYear(allData, selectedYear);
    };

    if (!user) {
        return <Navigate to='/' />;
    }

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo",
        "Junio", "Julio", "Agosto", "Septiembre", "Octubre",
        "Noviembre", "Diciembre",
    ];

    const categorias = Object.keys(comisos);
    const colors = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"
    ];

    // Datos para la primera gráfica (línea por meses)
    const lineData = {
        labels: meses,
        datasets: categorias.map((categoria, index) => ({
            label: categoria.replace("_", " ").toUpperCase(),
            data: meses.map((mes) => {
                const total = comisos[categoria]?.reduce((acc, item) => {
                    if (item.mes?.toLowerCase() === mes.toLowerCase()) {
                        return acc + (item.cantidad || 0);
                    }
                    return acc;
                }, 0);
                return total || 0;
            }),
            borderColor: colors[index],
            backgroundColor: colors[index] + "80",
            tension: 0.4,
            fill: false,
        })),
    };

    // Datos para la segunda gráfica (barras agrupadas por semanas)
    const barData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
        datasets: categorias.map((categoria, index) => ({
            label: categoria.replace("_", " ").toUpperCase(),
            data: [1, 2, 3, 4, 5].map((semana) => {
                // Sumamos las cantidades correspondientes a la semana
                const total = comisos[categoria]?.reduce((acc, item) => {
                    const key = `semana_${semana}`; // Clave dinámica para semana
                    if (item[key] !== undefined) {
                        return acc + parseFloat(item[key] || 0);
                    }
                    return acc;
                }, 0);
                return total || 0;
            }),
            backgroundColor: colors[index] + "80",
            borderColor: colors[index],
            borderWidth: 1,
        })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Header */}
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

                {/* Main Content */}
                <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Reportes Estadísticos</h2>

                        {/* Año Selector */}
                        <div className="mb-6 flex justify-end">
                            <label className="mr-4 font-semibold text-gray-700 text-lg">
                                Año:
                            </label>
                            <select
                                value={anio}
                                onChange={handleYearChange}
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {[2020, 2021, 2022, 2023, 2024].map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Primera Gráfica */}
                        {Object.keys(comisos).length === 0 ? (
                            <p className="text-center text-lg text-gray-500">No hay datos disponibles para el año seleccionado.</p>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[500px]">
                                <Line data={lineData} options={options} height={500} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Segunda Gráfica */}
                <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Valores Semanales por Categoría</h2>
                        {Object.keys(comisos).length === 0 ? (
                            <p className="text-center text-lg text-gray-500">No hay datos disponibles para el año seleccionado.</p>
                        ) : (
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full h-[500px]">
                                <Bar data={barData} options={options} height={500} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;