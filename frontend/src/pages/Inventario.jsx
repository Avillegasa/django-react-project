import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

const Inventario = () => {
  const { user } = useContext(UserContext);
  const [comisos, setComisos] = useState({}); // Estado para almacenar los datos obtenidos
  const [filteredData, setFilteredData] = useState({}); // Datos filtrados
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

  const categorias = [
    { value: "operacion-general", label: "Operación General" },
    { value: "mercaderia", label: "Mercadería" },
    { value: "vehiculo", label: "Vehículo" },
    { value: "incinerado", label: "Incinerado" },
    { value: "grua", label: "Grúa" },
  ];

  const detallesPorCategoria = {
    "operacion-general": [
      "PATRULLAJES MÓVILES",
      "ESCOLTAS",
      "EVACUACIONES",
      "ENFRENTAMIENTO CON CONTRABANDISTAS",
      "RECONOCIMIENTO",
      "PUESTOS DE CONTROL FIJO",
      "PATRULLAJES A PIE",
      "PUESTO DE CONTROL MÓVILES",
      "TRASLADO DE VEHÍCULOS",
      "INCINERACIÓN DE VEHÍCULOS",
      "OPERACIONES LOGÍSTICAS",
    ],
    mercaderia: [
      "PERECEDERA",
      "NO PERECEDERA",
      "MERCADERÍA VARIADA",
      "CARBURANTES",
      "SUSTANCIAS CONTROLADAS",
      "DIVISAS",
      "VEHÍCULOS COMISADOS",
    ],
    vehiculo: ["LIVIANOS", "MEDIANOS", "PESADOS", "MOTOCICLETAS", "EMBARCACIONES"],
    incinerado: ["LIVIANOS", "MEDIANOS", "PESADOS", "MOTOCICLETAS", "EMBARCACIONES"],
    grua: ["PERECEDERA", "NO PERECEDERA", "VEHÍCULOS LIVIANOS", "VEHÍCULOS MEDIANOS", "VEHÍCULOS PESADOS"],
  };

  const semanas = [
    { value: "semana_1", label: "Semana 1" },
    { value: "semana_2", label: "Semana 2" },
    { value: "semana_3", label: "Semana 3" },
    { value: "semana_4", label: "Semana 4" },
    { value: "semana_5", label: "Semana 5" },
  ];

  const meses = [
    { value: "Enero", label: "Enero" },
    { value: "Febrero", label: "Febrero" },
    { value: "Marzo", label: "Marzo" },
    { value: "Abril", label: "Abril" },
    { value: "Mayo", label: "Mayo" },
    { value: "Junio", label: "Junio" },
    { value: "Julio", label: "Julio" },
    { value: "Agosto", label: "Agosto" },
    { value: "Septiembre", label: "Septiembre" },
    { value: "Octubre", label: "Octubre" },
    { value: "Noviembre", label: "Noviembre" },
    { value: "Diciembre", label: "Diciembre" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/comisos/all-comisos/", {
          headers: { Authorization: `Token ${user.token}` },
        });
        setComisos(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    const filtered = {};
    Object.entries(comisos).forEach(([category, items]) => {
      const filteredItems = items.filter((item) => {
        const matchesDetalle = filters.detalle
          ? (
              item.detalle_operacion ||
              item.tipo_mercaderia ||
              item.tipo_vehiculo ||
              item.tipo_incinerado ||
              item.mercaderia_transportada
            )
              ?.toLowerCase()
              .includes(filters.detalle.toLowerCase())
          : true;
        const matchesCategoria = filters.categoria
          ? category.toLowerCase() === filters.categoria.toLowerCase()
          : true;
        const matchesSemana = filters.semana
          ? item[filters.semana] !== undefined && item[filters.semana] > 0
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

      if (filteredItems.length > 0) {
        filtered[category] = filteredItems;
      }
    });
    setFilteredData(filtered);
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-[#ECF0F1] border-b border-gray-300 flex items-center justify-between px-6 py-3">
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">SICOSE</h1>
        </div>
        <div className="flex flex-col items-center justify-start flex-1 p-8">
          <div className="bg-[#F8F9FA] border border-gray-300 rounded-lg shadow-md p-4 mb-8 w-full max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold text-[#2C3E50]">
              INVENTARIO Y BÚSQUEDA DE COMISOS
            </h1>
          </div>
          <button
            className="mb-4 bg-[#2980B9] text-white px-4 py-2 rounded-lg hover:bg-[#1F618D]"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Ocultar Filtros" : "Filtrar Búsqueda"}
          </button>
          {showFilters && (
            <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-7xl mb-4">
              <div className="grid grid-cols-3 gap-4">
                <select
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <select
                  name="detalle"
                  value={filters.detalle}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Seleccione un detalle</option>
                  {detallesPorCategoria[filters.categoria]?.map((detalle) => (
                    <option key={detalle} value={detalle}>
                      {detalle}
                    </option>
                  ))}
                </select>
                <select
                  name="semana"
                  value={filters.semana}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Seleccione una semana</option>
                  {semanas.map((semana) => (
                    <option key={semana.value} value={semana.value}>
                      {semana.label}
                    </option>
                  ))}
                </select>
                <select
                  name="mes"
                  value={filters.mes}
                  onChange={handleFilterChange}
                  className="p-2 border rounded-md"
                >
                  <option value="">Seleccione un mes</option>
                  {meses.map((mes) => (
                    <option key={mes.value} value={mes.value}>
                      {mes.label}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="anio"
                  value={filters.anio}
                  onChange={handleFilterChange}
                  placeholder="Año"
                  className="p-2 border rounded-md"
                />
                <input
                  type="number"
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
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl">
            <h2 className="text-2xl font-bold mb-6">Datos de Inventario</h2>
            {loading ? (
              <p className="text-center">Cargando datos...</p>
            ) : Object.keys(filteredData).length === 0 ? (
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
                    {Object.entries(filteredData).map(([category, items]) =>
                      items.map((item, index) => (
                        <tr key={`${category}-${index}`}>
                          <td className="px-6 py-4 border-t capitalize">
                            {category.replace("_", " ")}
                          </td>
                          <td className="px-6 py-4 border-t">
                            {item.detalle_operacion ||
                              item.tipo_mercaderia ||
                              item.tipo_vehiculo ||
                              item.tipo_incinerado ||
                              item.mercaderia_transportada ||
                              "N/A"}
                          </td>
                          <td className="px-6 py-4 border-t">{item.mes || "N/A"}</td>
                          <td className="px-6 py-4 border-t">{item.anio || "N/A"}</td>
                          <td className="px-6 py-4 border-t">{item.cantidad || "N/A"}</td>
                        </tr>
                      ))
                    )}
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
