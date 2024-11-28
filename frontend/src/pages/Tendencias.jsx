import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BarChart, LineChart, AreaChart, Bar, Line, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import UserIcon from "../assets/icons/usericon.png";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";
import { fetchCategoryData, fetchPrediction } from "../services/predictions";

// Componente de Tooltip personalizado para mostrar solo la fecha sin la hora
const CustomTooltip = ({ payload, label }) => {
    if (payload && payload.length) {
        // Extraemos solo la fecha
        const date = new Date(label);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return (
            <div className="custom-tooltip">
                <p className="label">{formattedDate}</p>
                <p className="intro">{`${payload[0].name}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

const Tendencias = () => {
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState("Operaciones Generales"); // Predicción General eliminada
    const [period, setPeriod] = useState("month"); // Período predeterminado
    const [chartType, setChartType] = useState("bar"); // Tipo de gráfica predeterminado
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Cargar datos históricos y predicciones por categoría
                const categoryData = await fetchCategoryData(category, period);
                const combinedData = [
                    ...categoryData.historical_data.map((item) => ({
                        ...item,
                        type: "Histórico",
                    })),
                    ...categoryData.predicted_data.map((item) => ({
                        ...item,
                        type: "Predicción",
                    })),
                ];
                setData(combinedData);
            } catch (err) {
                setError(err.message || "Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [category, period]);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (loading) return <p>Cargando datos...</p>;

    if (error) return <p className="text-red-500">Error: {error}</p>;

    // Filtrar y renderizar el gráfico según el tipo seleccionado
    const renderChart = (dataType) => {
        const filteredData = data.filter(item => item.type === dataType);

        // Definimos las dimensiones por gráfico
        const chartDimensions = {
            "Histórico": { width: 1000, height: 500 },  // Históricos
            "Predicción": { width: 200  , height: 500 }, // Predicción
        };

        const { width, height } = chartDimensions[dataType];

        switch (chartType) {
            case "bar":
                return (
                    <BarChart data={filteredData} width={width} height={height}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="quantity" fill={dataType === "Histórico" ? "#82ca9d" : "#8884d8"} name={dataType} />
                    </BarChart>
                );
            case "line":
                return (
                    <LineChart data={filteredData} width={width} height={height}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="quantity" stroke={dataType === "Histórico" ? "#82ca9d" : "#8884d8"} name={dataType} />
                    </LineChart>
                );
            case "area":
                return (
                    <AreaChart data={filteredData} width={width} height={height}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="quantity" stroke={dataType === "Histórico" ? "#82ca9d" : "#8884d8"} fill={dataType === "Histórico" ? "#82ca9d" : "#8884d8"} name={dataType} />
                    </AreaChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <div className="bg-[#ECF0F1] border-b border-black flex items-center justify-between px-6 py-3">
                    <h1 className="text-xl tracking-[0.5em] font-bold text-black">SICOSE</h1>
                    <Link to="/user-details">
                        <img
                            src={UserIcon}
                            alt="Usuario"
                            className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
                        />
                    </Link>
                </div>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Tendencias y Predicciones</h1>

                    {/* Selectores de Categoría y Período */}
                    <div className="flex gap-4 mb-4">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="Operaciones Generales">Operaciones Generales</option>
                            <option value="Mercadería">Mercadería</option>
                            <option value="Vehículos">Vehículos</option>
                            <option value="Incinerados">Incinerados</option>
                            <option value="Grúas">Grúas</option>
                        </select>

                        <select
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="month">Mensual</option>
                            <option value="semester">Semestral</option>
                            <option value="year">Anual</option>
                        </select>

                        <select
                            value={chartType}
                            onChange={(e) => setChartType(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="bar">Barras</option>
                            <option value="line">Líneas</option>
                            <option value="area">Áreas</option>
                        </select>
                    </div>

                    {/* Contenedor de Gráficas Separadas */}
                    <div className="flex justify-between gap-6">
                        <div className="flex-1">{renderChart("Histórico")}</div>
                        <div className="flex-1">{renderChart("Predicción")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tendencias;
