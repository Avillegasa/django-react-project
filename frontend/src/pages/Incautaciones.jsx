import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../assets/icons/usericon.png";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

const Incautaciones = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    categoria: "",
    detalle: "",
    anio: "",
    mes: "",
    semana: "",
    cantidad: "",
  });

  const categorias = [
    { value: "operacion-general", label: "Operación General" },
    { value: "mercaderia", label: "Mercadería" },
    { value: "vehiculo", label: "Vehículo" },
    { value: "incinerado", label: "Incinerado" },
    { value: "grua", label: "Grúa" },
  ];

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto base con campos comunes
    const dataToSend = {
      anio: parseInt(formData.anio),
      mes: formData.mes,
      semana: formData.semana.replace("semana_", ""), // Convertir a número
      cantidad: parseInt(formData.cantidad),
      detalle: formData.detalle,
      categoria: formData.categoria,
    };

    // Adaptar "detalle" según la categoría seleccionada
    if (formData.categoria === "mercaderia") {
      dataToSend.tipo_mercaderia = formData.detalle; // Campo específico para Mercadería
    } else if (formData.categoria === "vehiculo") {
      dataToSend.tipo_vehiculo = formData.detalle; // Campo específico para Vehículo
    } else if (formData.categoria === "incinerado") {
      dataToSend.tipo_incinerado = formData.detalle; // Campo específico para Incinerado
    } else if (formData.categoria === "grua") {
      dataToSend.mercaderia_transportada = formData.detalle; // Campo específico para Grúa
    } else {
      dataToSend.detalle_operacion = formData.detalle; // Campo específico para Operación General
    }


    try {
      await axios.post(
        `http://127.0.0.1:8000/api/comisos/${formData.categoria}/`,
        dataToSend,
        {
          headers: {
            Authorization: `Token ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(`${formData.categoria.replace("-", " ")} registrado correctamente`);
      setFormData({
        categoria: "",
        detalle: "",
        anio: "",
        mes: "",
        semana: "",
        cantidad: "",
      });
    } catch (error) {
      console.error(`Error registrando ${formData.categoria}:`, error.response?.data || error);
      alert(`Error al registrar ${formData.categoria.replace("-", " ")}`);
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

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

        {/* Formulario */}
        <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">
              Registro de Incautaciones
            </h2>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit}
            >
              {/* Categoría de incautación */}
              <div>
                <label className="block font-bold text-gray-700">
                  Categoría de incautación
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                >
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Detalle */}
              <div>
                <label className="block font-bold text-gray-700">
                  Detalle
                </label>
                <input
                  type="text"
                  name="detalle"
                  placeholder="Ingrese el detalle"
                  value={formData.detalle}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>

              {/* Año */}
              <div>
                <label className="block font-bold text-gray-700">Año</label>
                <input
                  type="number"
                  name="anio"
                  placeholder="Ingrese el año"
                  value={formData.anio}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>

              {/* Mes */}
              <div>
                <label className="block font-bold text-gray-700">Mes</label>
                <select
                  name="mes"
                  value={formData.mes}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                >
                  <option value="">Seleccione un mes</option>
                  {meses.map((mes) => (
                    <option key={mes.value} value={mes.value}>
                      {mes.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seleccionar una semana */}
              <div>
                <label className="block font-bold text-gray-700">
                  Seleccione una semana
                </label>
                <select
                  name="semana"
                  value={formData.semana}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                >
                  <option value="">Seleccione una semana</option>
                  {semanas.map((sem) => (
                    <option key={sem.value} value={sem.value}>
                      {sem.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cantidad */}
              <div>
                <label className="block font-bold text-gray-700">
                  Cantidad
                </label>
                <input
                  type="number"
                  name="cantidad"
                  placeholder="Ingrese la cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                />
              </div>

              {/* Botón */}
              <div className="col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#2980B9] text-white px-6 py-2 rounded-lg"
                >
                  Registrar Incautación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default Incautaciones;


