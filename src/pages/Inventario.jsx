import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/Sidebar";

const Inventario = () => {
  const { user } = useContext(UserContext);

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
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">
            SICOSE
          </h1>

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
            <div className="grid grid-cols-4 gap-0">
              {/* Categoría */}
              <div className="col-span-1 px-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Categoría
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]">
                  <option>Seleccione una categoría</option>
                  <option>Operación General</option>
                  <option>Mercadería</option>
                  <option>Víctimas</option>
                  <option>Incinerado</option>
                  <option>Grúa</option>
                </select>
              </div>

              {/* Semana */}
              <div className="col-span-1 px-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Semana
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]">
                  <option>Seleccione una semana</option>
                  <option>Semana 1</option>
                  <option>Semana 2</option>
                  <option>Semana 3</option>
                  <option>Semana 4</option>
                  <option>Semana 5</option>
                </select>
              </div>

              {/* Mes */}
              <div className="col-span-1 px-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Mes
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]">
                  <option>Seleccione un mes</option>
                  <option>Enero</option>
                  <option>Febrero</option>
                  <option>Marzo</option>
                  <option>Abril</option>
                  <option>Mayo</option>
                  <option>Junio</option>
                  <option>Julio</option>
                  <option>Agosto</option>
                  <option>Septiembre</option>
                  <option>Octubre</option>
                  <option>Noviembre</option>
                  <option>Diciembre</option>
                </select>
              </div>

              {/* Año */}
              <div className="col-span-1 px-6">
                <label className="block text-sm font-semibold text-gray-700">
                  Año
                </label>
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]">
                  <option>Seleccione un año</option>
                  <option>2020</option>
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                  <option>2024</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
            <div className="overflow-x-auto">
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
                  {[
                    { categoria: "Operación General", semana: "Semana 1", mes: "Enero", año: 2022, color: "text-green-600" },
                    { categoria: "Mercadería", semana: "Semana 3", mes: "Febrero", año: 2022, color: "text-green-600" },
                    { categoria: "Víctimas", semana: "Semana 2", mes: "Marzo", año: 2023, color: "text-yellow-600" },
                    { categoria: "Incinerado", semana: "Semana 4", mes: "Abril", año: 2023, color: "text-yellow-600" },
                    { categoria: "Grúa", semana: "Semana 1", mes: "Mayo", año: 2023, color: "text-yellow-600" },
                    { categoria: "Operación General", semana: "Semana 3", mes: "Junio", año: 2022, color: "text-green-600" },
                    { categoria: "Mercadería", semana: "Semana 2", mes: "Julio", año: 2023, color: "text-yellow-600" },
                    { categoria: "Víctimas", semana: "Semana 4", mes: "Agosto", año: 2024, color: "text-red-600" },
                    { categoria: "Incinerado", semana: "Semana 1", mes: "Septiembre", año: 2024, color: "text-red-600" },
                    { categoria: "Grúa", semana: "Semana 3", mes: "Octubre", año: 2024, color: "text-red-600" },
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 border-t">{row.categoria}</td>
                      <td className="px-6 py-4 border-t">{row.semana}</td>
                      <td className="px-6 py-4 border-t">{row.mes}</td>
                      <td className={`px-6 py-4 border-t ${row.color}`}>{row.año}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">Mostrando 1 a 10 de 430 entradas</span>
              <div className="flex items-center gap-2">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  &lt;
                </button>
                <button className="bg-[#3498DB] text-white px-4 py-2 rounded-md">
                  1
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  2
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  3
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  ...
                </button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventario;
