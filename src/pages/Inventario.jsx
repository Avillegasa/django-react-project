import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/Sidebar";

const Inventario = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-[#ECF0F1] border-b border-gray-300 flex items-center justify-between px-6 py-3">
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">
            SICOSE
          </h1>
          <img
            src="/path-to-user-icon.png"
            alt="Usuario"
            className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
          />
        </div>
        <div className="flex flex-col items-center justify-start flex-1 p-8">
          <div className="bg-[#F8F9FA] border border-gray-300 rounded-lg shadow-md p-4 mb-8 w-full max-w-4xl text-center">
            <h1 className="text-3xl font-extrabold text-[#2C3E50]">
              INVENTARIO Y BÚSQUEDA DE COMISOS
            </h1>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-7xl">
            <div className="p-4 border-b border-gray-300 flex items-center gap-4">
              <input
                type="text"
                placeholder="Número único de registro"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3498DB]"
              />
              <button className="bg-[#3498DB] text-white px-6 py-3 rounded-md hover:bg-[#2980B9]">
                Buscar
              </button>
            </div>
            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-4 border-b">
                    <input type="checkbox" />
                  </th>
                  <th className="px-6 py-4 border-b">Nombre de Registro</th>
                  <th className="px-6 py-4 border-b">Área Responsable</th>
                  <th className="px-6 py-4 border-b">Lugar</th>
                  <th className="px-6 py-4 border-b">Estado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, nombre: "Comiso 1", area: "Flores", lugar: "Laja, La Paz", estado: "Activo", color: "text-green-600" },
                  { id: 2, nombre: "Comiso 2", area: "Madriguera", lugar: "Achocalla, La Paz", estado: "Pendiente", color: "text-orange-500" },
                  { id: 3, nombre: "Comiso 3", area: "Richards", lugar: "Viacha, La Paz", estado: "Inactivo", color: "text-red-600" },
                  { id: 4, nombre: "Comiso 4", area: "Courtney", lugar: "Palca, La Paz", estado: "Activo", color: "text-green-600" },
                  { id: 5, nombre: "Comiso 5", area: "Marvin", lugar: "Mecapaca, La Paz", estado: "Pendiente", color: "text-orange-500" },
                  { id: 6, nombre: "Comiso 6", area: "Bell", lugar: "Batallas, La Paz", estado: "Inactivo", color: "text-red-600" },
                  { id: 7, nombre: "Comiso 7", area: "Jacob", lugar: "Pucarani, La Paz", estado: "Activo", color: "text-green-600" },
                  { id: 8, nombre: "Comiso 8", area: "Hawkins", lugar: "Patacamaya, La Paz", estado: "Pendiente", color: "text-orange-500" },
                  { id: 9, nombre: "Comiso 9", area: "Howard", lugar: "Chulumani, La Paz", estado: "Inactivo", color: "text-red-600" },
                  { id: 10, nombre: "Comiso 10", area: "Flores", lugar: "Coroico, La Paz", estado: "Activo", color: "text-green-600" },
                ].map((registro) => (
                  <tr key={registro.id}>
                    <td className="border-t px-4 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="border-t px-6 py-4">
                      <div>
                        <span className="block font-bold">{registro.nombre}</span>
                        <span className="block text-sm text-gray-500">{registro.area}</span>
                      </div>
                    </td>
                    <td className="border-t px-6 py-4">{registro.area}</td>
                    <td className="border-t px-6 py-4">{registro.lugar}</td>
                    <td className="border-t px-6 py-4">
                      <span className={`${registro.color} font-bold`}>{registro.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-300 flex justify-between items-center">
              <span className="text-gray-600">Mostrando 1-10 de 430 entradas</span>
              <div className="flex items-center gap-2">
                <button className="bg-[#2980B9] text-white px-4 py-2 rounded-md">
                  Anterior
                </button>
                <button className="bg-[#3498DB] text-white px-4 py-2 rounded-md">
                  Siguiente
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
  