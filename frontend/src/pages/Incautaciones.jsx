import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
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

  const [detallesOpciones, setDetallesOpciones] = useState([]);

  // Opciones por categoría
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

  // Opciones para cada categoría
  const detallesPorCategoria = {
    "operacion-general": [
      "PATRULLAJES MOVIL",
      "PATRULLAJES A PIE",
      "PUESTOS DE CONTROL FIJO",
      "PUESTO DE CONTROL MOVILES",
      "RECONOCIMIENTO",
      "ESCOLTAS",
      "TRASLADO DE VEHICULOS",
      "TRASLADO DE COMISOS O MERCADERIA",
      "OPERACIONES LOGISTICAS",
      "EVACUACIONES",
      "ENFRENTAMIENTO CON CONTRABANDISTAS",
      "REUNION CON LOS COMUNARIOS DEL LUGAR",
      "INCINERACION DE VEHICULOS CHUTOS",
    ],
    mercaderia: [
      "PERECEDERA",
      "NO PERECEDERA",
      "MERCADERIA VARIADA",
      "CARBURANTES",
      "SUSTANCIAS CONTROLADAS",
      "DIVISAS",
      "VEHICULOS",
    ],
    vehiculo: ["LIVIANOS", "MEDIANOS", "PESADOS", "MOTOCICLETAS", "EMBARCACIONES"],
    incinerado: ["LIVIANOS", "MEDIANOS", "PESADOS", "MOTOCICLETAS", "EMBARCACIONES"],
    grua: [
      "PERECEDERA",
      "NO PERECEDERA",
      "MERCADERIA VARIADA",
      "CARBURANTES",
      "SUSTANCIAS CONTROLADAS",
      "DIVISAS",
      "VEHICULOS LIVIANOS",
      "VEHICULOS MEDIANOS",
      "VEHICULOS PESADOS",
      "MOTOCICLETAS",
      "EMBARCACIONES",
    ],
  };

  // Manejar cambio en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "categoria") {
      // Actualizar opciones de detalle según categoría
      setDetallesOpciones(detallesPorCategoria[value] || []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      semana: formData.semana.replace("semana_", ""),
      cantidad: parseInt(formData.cantidad),
      anio: parseInt(formData.anio),
    };

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

      alert("Registro realizado con éxito");
      setFormData({
        categoria: "",
        detalle: "",
        anio: "",
        mes: "",
        semana: "",
        cantidad: "",
      });
    } catch (error) {
      console.error("Error al registrar:", error.response?.data || error);
      alert("Error al registrar");
    }
  };

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-[#ECF0F1] border-b px-6 py-3">
          <h1 className="text-xl font-bold">SICOSE</h1>
        </div>
        <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Registro de Incautaciones</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
              {/* Categoría */}
              <div>
                <label className="block font-bold text-gray-700">Categoría de incautación</label>
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
                <label className="block font-bold text-gray-700">Detalle</label>
                <select
                  name="detalle"
                  value={formData.detalle}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border rounded w-full"
                  required
                >
                  <option value="">Seleccione un detalle</option>
                  {detallesOpciones.map((det) => (
                    <option key={det} value={det}>
                      {det}
                    </option>
                  ))}
                </select>
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

              {/* Semana */}
              <div>
                <label className="block font-bold text-gray-700">Seleccione una semana</label>
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
                <label className="block font-bold text-gray-700">Cantidad</label>
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
                <button type="submit" className="bg-[#2980B9] text-white px-6 py-2 rounded-lg">
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
