import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

const Inventario = () => {
  const { user } = useContext(UserContext);
  const [comisos, setComisos] = useState([]); // Asegúrate de que comisos sea un arreglo
  const [filteredData, setFilteredData] = useState([]); // Datos filtrados
  const [loading, setLoading] = useState(true); // Estado de carga
  const [showFilters, setShowFilters] = useState(false); // Mostrar/ocultar filtros
  const [filters, setFilters] = useState({
    detalle: "",
    categoria: "",
    semana: "",
    mes: "",
    anio: "",
    cantidad: "",
  }); // Estado para filtros

  // Obtener los datos al montar el componente
  useEffect(() => {
    const fetchComisos = async () => {
      
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/comisos/", {
          headers: { Authorization: `Token ${user.token}` },
        });

        

        const { operacion_general, mercaderia, vehiculo, incinerado, grua } = response.data;
        
        const allComisos = [
          ...operacion_general.map((item) => ({ ...item, categoria: "Operación General" })),
          ...mercaderia.map((item) => ({ ...item, categoria: "Mercadería" })),
          ...vehiculo.map((item) => ({ ...item, categoria: "Vehículo" })),
          ...incinerado.map((item) => ({ ...item, categoria: "Incinerado" })),
          ...grua.map((item) => ({ ...item, categoria: "Grúa" })),
        ];
        setComisos(allComisos);
        setFilteredData(allComisos);
        setLoading(false);
      } catch (error) {
        
        setLoading(false);
      }
    };

    fetchComisos();
  }, [user.token]);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Aplicar los filtros
  const applyFilters = () => {
    const filtered = comisos.filter((item) => {
      const matchesDetalle = filters.detalle
        ? item.detalle_operacion?.toLowerCase().includes(filters.detalle.toLowerCase())
        : true;
      const matchesCategoria = filters.categoria
        ? item.categoria?.toLowerCase().includes(filters.categoria.toLowerCase())
        : true;
      const matchesSemana = filters.semana
        ? item.semana === filters.semana
        : true;
      const matchesMes = filters.mes ? item.mes === filters.mes : true;
      const matchesAnio = filters.anio ? item.anio == filters.anio : true;
      const matchesCantidad = filters.cantidad
        ? item.cantidad == filters.cantidad
        : true;

      return (
        matchesDetalle &&
        matchesCategoria &&
        matchesSemana &&
        matchesMes &&
        matchesAnio &&
        matchesCantidad
      );
    });

    setFilteredData(filtered);
  };

  // Redirigir si el usuario no está autenticado
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra Superior */}
        <div className="bg-[#ECF0F1] border-b border-gray-300 flex items-center justify-between px-6 py-3">
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">SICOSE</h1>
        </div>

        {/* Contenido de Inventario */}
        <div className="flex flex-col items-center justify-start flex-1 p-8">
          <div className="bg-[#F8F9FA] border border-gray-300 rounded-lg shadow-md p-4 mb-8 w-full max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold text-[#2C3E50]">
              INVENTARIO Y BÚSQUEDA DE COMISOS
            </h1>
          </div>

          {/* Botón para mostrar/ocultar filtros */}
          <button
            className="mb-4 bg-[#2980B9] text-white px-4 py-2 rounded-lg hover:bg-[#1F618D]"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Ocultar Filtros" : "Filtrar Búsqueda"}
          </button>

          {/* Filtros */}
          {showFilters && (
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-7xl mb-4">
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="detalle"
                  value={filters.detalle}
                  onChange={handleFilterChange}
                  placeholder="Detalle Operación"
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                  placeholder="Categoría"
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="semana"
                  value={filters.semana}
                  onChange={handleFilterChange}
                  placeholder="Semana"
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="mes"
                  value={filters.mes}
                  onChange={handleFilterChange}
                  placeholder="Mes"
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="anio"
                  value={filters.anio}
                  onChange={handleFilterChange}
                  placeholder="Año"
                  className="p-2 border rounded-md"
                />
                <input
                  type="text"
                  name="cantidad"
                  value={filters.cantidad}
                  onChange={handleFilterChange}
                  placeholder="Cantidad"
                  className="p-2 border rounded-md"
                />
                <button
                  onClick={applyFilters}
                  className="bg-[#3498DB] text-white px-4 py-2 rounded-md hover:bg-[#1F618D]"
                >
                  Aplicar Filtros
                </button>
              </div>
            </div>
          )}
          {/* Mostrar datos */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
            <h2 className="text-2xl font-bold mb-6">Datos de Inventario</h2>
            {loading ? (
              <p className="text-center">Cargando datos...</p>
            ) : filteredData.length === 0 ? (
              <p className="text-center">No hay datos disponibles.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-6 py-4 border-b">Categoría</th>
                      <th className="px-6 py-4 border-b">Detalle</th>
                      <th className="px-6 py-4 border-b">Mes</th>
                      <th className="px-6 py-4 border-b">Año</th>
                      <th className="px-6 py-4 border-b">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{item.categoria}</td>
                      <td className="px-6 py-4">{item.detalle}</td>
                      <td className="px-6 py-4">{item.mes}</td>
                      <td className="px-6 py-4">{item.anio}</td>
                      <td className="px-6 py-4">{item.cantidad}</td>
                    </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;