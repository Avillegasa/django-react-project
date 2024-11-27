import axios from 'axios';
import "chart.js/auto";
import { default as React, useContext, useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../assets/icons/usericon.png";
import Sidebar from '../components/Sidebar';
import { UserContext } from '../contexts/UserContext';


const Estadisticas = () => {
    const { user } = useContext(UserContext);
    const [comisos, setComisos] = useState({});
    const [anio, setAnio] = useState(new Date().getFullYear());
    const [mes, setMes] = useState("Enero");
    const [allData, setAllData] = useState({});

    // Obtener datos del backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/comisos/all-comisos/", {
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

    const handleMonthChange = (e) => {
        setMes(e.target.value);
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

    // Datos para la segunda gráfica (barras agrupadas por semanas para el mes seleccionado)
    const barData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
        datasets: categorias.map((categoria, index) => ({
            label: categoria.replace("_", " ").toUpperCase(),
            data: [1, 2, 3, 4, 5].map((semana) => {
                const total = comisos[categoria]?.reduce((acc, item) => {
                    if (item.mes?.toLowerCase() === mes.toLowerCase()) {
                        const key = `semana_${semana}`;
                        if (item[key] !== undefined) {
                            return acc + parseFloat(item[key] || 0);
                        }
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
                        <h2 className="text-3xl font-bold mb-6 text-center">ESTADÍSTICAS GRÁFICAS</h2>

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
                        
                        {/* Textos explicativos de categorías */}
                        <div className="mb-6 bg-gray-100 p-4 rounded-lg border border-gray-300">
                            <h3 className="text-lg font-semibold text-gray-800">SOBRE LAS CATEGORÍAS:</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2">
                                <li><span className="font-bold text-gray-800">OPERACIÓN GENERAL:</span> Son aquellas operaciones llevadas a cabo por las distintas unidades operativas con las que cuenta el Viceministerio de Lucha Contra el Contrabando (Patrullajes móviles, Patrullajes a Pie, Evacuaciones, Enfrentamientos con contrabandistas y demas similares).</li>
                                <li><span className="font-bold text-gray-800">MERCADERÍA:</span> Se refiere a aquellos productos comisados en las distintas operaciones (comestibles, enlatados, equipos electronicos, carburantes, divisas, sustancias controladas, etc).</li>
                                <li><span className="font-bold text-gray-800">VEHÍCULO:</span> Vehiculos comisados con distintas caracteristicas (pesados, livianos, medianos, motocicletas, embarcaciones)</li>
                                <li><span className="font-bold text-gray-800">INCINERADO:</span> Vehiculos comisados con distintas caracteristicas los cuales por algun motivo requerian ser incinerados</li>
                                <li><span className="font-bold text-gray-800">GRIA:</span> Se refiere a los comisos realizados por los Grupos de Reacción Inmediata.</li>
                                {/* Agrega más categorías si es necesario */}
                            </ul>
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
                        <h2 className="text-xl font-bold mb-6 text-center">Valores Semanales por Categoría de la gestion seleccionada</h2>

                        {/* Mes Selector */}
                        <div className="mb-6 flex justify-end">
                            <label className="mr-4 font-semibold text-gray-700 text-lg">
                                Mes:
                            </label>
                            <select
                                value={mes}
                                onChange={handleMonthChange}
                                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {meses.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {Object.keys(comisos).length === 0 ? (
                            <p className="text-center text-lg text-gray-500">No hay datos disponibles para el mes seleccionado.</p>
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