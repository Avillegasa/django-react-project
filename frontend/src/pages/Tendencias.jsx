import React, { useContext, useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/Sidebar";
import { fetchPrediction, fetchCategoryData } from "../services/predictions";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import UserIcon from "../assets/icons/usericon.png";

const Tendencias = () => {
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState("Predicción General"); // Predicción General como opción predeterminada
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                if (category === "Predicción General") {
                    // Cargar datos de predicción
                    const predictionData = await fetchPrediction();
                    setData([
                        {
                            name: "Predicción",
                            quantity: predictionData.predicted_quantity,
                            date: predictionData.future_date,
                        },
                    ]);
                } else {
                    // Cargar datos de la categoría seleccionada
                    const categoryData = await fetchCategoryData(category);
                    setData(categoryData.data);
                }
            } catch (err) {
                setError(err.message || "Error al cargar los datos");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [category]);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (loading) return <p>Cargando datos...</p>;

    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
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

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Tendencias y Predicciones</h1>

                    {/* Selector de Categorías */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mb-4 p-2 border rounded"
                    >
                        <option value="Predicción General">Predicción General</option>
                        <option value="Operaciones Generales">Operaciones Generales</option>
                        <option value="Mercadería">Mercadería</option>
                        <option value="Vehículos">Vehículos</option>
                        <option value="Incinerados">Incinerados</option>
                        <option value="Grúas">Grúas</option>
                    </select>

                    {/* Gráfico */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            {category === "Predicción General"
                                ? "Predicción General"
                                : `Tendencias de ${category}`}
                        </h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey={category === "Predicción General" ? "name" : "date"} />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey={category === "Predicción General" ? "quantity" : "quantity"}
                                    fill="#82ca9d"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tendencias;
