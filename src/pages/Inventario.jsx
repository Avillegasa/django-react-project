import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/Sidebar";

const Inventario = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]); // Para almacenar los datos de la API
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const [filters, setFilters] = useState({
    categoria: "",
    semana: "",
    mes: "",
    anio: "",
  });

  // Función para manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Función para buscar los registros
  const handleSearch = async () => {
    setLoading(true);
    try {
      console.log("Realizando solicitud a la API...");
      const response = await fetch("http://127.0.0.1:8000/api/comisos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${user.token}`,
        },
      });

      const result = await response.json();
      console.log("Datos recuperados de la API:", result);

      // Filtrar datos según los filtros seleccionados
      const filteredData = result.filter((item) => {
        const categoriaMatch =
          !filters.categoria || item.categoria === filters.categoria;
        const semanaMatch = !filters.semana || item.semana === filters.semana;
        const mesMatch = !filters.mes || item.mes === filters.mes;
        const anioMatch = !filters.anio || item.anio === Number(filters.anio);

        // Mostrar log de cada filtro
        console.log("Filtro por categoría:", categoriaMatch);
        console.log("Filtro por semana:", semanaMatch);
        console.log("Filtro por mes:", mesMatch);
        console.log("Filtro por año:", anioMatch);

        return categoriaMatch && semanaMatch && mesMatch && anioMatch;
      });

      console.log("Datos filtrados:", filteredData);
      setData(filteredData);
    } catch (error) {
      console.error("Error al realizar la solicitud a la API:", error);
    }
    setLoading(false);
  };

  // Redirige al login si no hay un usuario autenticado
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
          {/* Título SICOSE */}
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">SICOSE</h1>

          {/* Ícono de Usuario */}
          <img
            src="/path-to-user-icon.png"
            alt="Usuario"
            className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
          />
        </div>

        {/* Contenido de Inventario */}
        <div className="flex flex-col items-center justify-start flex-1 p-8">
          {/* Título con marco */}
          <div className="bg-[#F8F9FA] border border-gray-300 rounded-lg shadow-md p-4 mb-8 w-full max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold text-[#2C3E50]">
              INVENTARIO Y BÚSQUEDA DE COMISOS
            </h1>
          </div>

          {/* Barra de Filtros */}
          <div className="bg-gray-100 shadow-md rounded-lg p-4 w-full max-w-7xl mb-4">
            <div className="grid grid-cols-5 gap-4">
              {/* Categoría */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Categoría
                </label>
                <select
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                >
                  <option value="">Seleccione una categoría</option>
                  <option value="Operación General">Operación General</option>
                  <option value="Mercadería">Mercadería</option>
                  <option value="Víctimas">Víctimas</option>
                  <option value="Incinerado">Incinerado</option>
                  <option value="Grúa">Grúa</option>
                </select>
              </div>

              {/* Semana */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Semana
                </label>
                <select
                  name="semana"
                  value={filters.semana}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                >
                  <option value="">Seleccione una semana</option>
                  <option value="Semana 1">Semana 1</option>
                  <option value="Semana 2">Semana 2</option>
                  <option value="Semana 3">Semana 3</option>
                  <option value="Semana 4">Semana 4</option>
                  <option value="Semana 5">Semana 5</option>
                </select>
              </div>

              {/* Mes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Mes
                </label>
                <select
                  name="mes"
                  value={filters.mes}
                  onChange={handleFilterChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                >
                  <option value="">Seleccione un mes</option>
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>
                  <option value="Marzo">Marzo</option>
                  <option value="Abril">Abril</option>
                  <option value="Mayo">Mayo</option>
                  <option value="Junio">Junio</option>
                  <option value="Julio">Julio</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Septiembre">Septiembre</option>
                  <option value="Octubre">Octubre</option>
                  <option value="Noviembre">Noviembre</option>
                  <option value="Diciembre">Diciembre</option>
                </select>
              </div>

              {/* Año */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Año
                </label>
                <input
                  type="number"
                  name="anio"
                  value={filters.anio}
                  onChange={handleFilterChange}
                  placeholder="Ingrese un año"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
                />
              </div>

              {/* Botón Buscar */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="bg-[#2980B9] text-white px-4 py-2 rounded-lg hover:bg-[#1F618D]"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-4">Cargando...</div>
              ) : data.length > 0 ? (
                <table className="table-auto w-full text-left border-collapse">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-6 py-4 border-b">Categoría</th>
                      <th className="px-6 py-4 border-b">Semana</th>
                      <th className="px-6 py-4 border-b">Mes</th>
                      <th className="px-6 py-4 border-b">Año</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 border-t">{item.categoria}</td>
                        <td className="px-6 py-4 border-t">{item.semana}</td>
                        <td className="px-6 py-4 border-t">{item.mes}</td>
                        <td className="px-6 py-4 border-t">{item.anio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4">No se encontraron resultados.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
