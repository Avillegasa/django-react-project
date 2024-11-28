import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserIcon from "../assets/icons/usericon.png";
import InicioLogo from "../assets/images/inicioimag.png";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  // Redirige al login si no hay un usuario autenticado
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
          {/* Título SICOSE */}
          <h1 className="text-xl tracking-[0.5em] font-bold text-black">SICOSE</h1>

          {/* Ícono de Usuario */}
          <Link to='/user-details'>
          <img
            src={UserIcon}
            alt="Usuario"
            className="w-[32px] h-[32px] cursor-pointer hover:opacity-80"
          />
          </Link>
        </div>
        
        {/* Contenido del Dashboard */}
        <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
          {/* Título en un recuadro */}
          <div className="bg-[#ECF0F1] rounded-md shadow p-6 w-full max-w-4xl mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2C3E50]">
              Viceministerio de Lucha Contra el Contrabando
            </h2>
          </div>

          {/* Imagen y Texto */}
          <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
            {/* Imagen */}
            <div className="w-full md:w-1/2">
              <img
                src={InicioLogo}
                alt="Imagen de lucha contra el contrabando"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Texto */}
            <div className="p-6 md:w-1/2">
              <h3 className="text-xl font-bold text-[#2980B9] mb-4">VLCC</h3>
              <p className="text-gray-700 leading-relaxed">
                El Decreto Supremo N°3540 establece que con el fin de
                implementar políticas y estrategias de lucha contra el
                contrabando y fortalecer los mecanismos de coordinación
                interinstitucional, es necesario crear un Viceministerio en la
                estructura del Ministerio de Defensa, para que de manera
                articulada coadyuve en tareas de lucha contra el contrabando con
                la Aduana Nacional de Bolivia, las Fuerzas Armadas y con la
                Policía Boliviana.
              </p>
            </div>
          </div>

          {/* Subtítulo y Texto Largo */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mt-6">
            <h4 className="text-xl font-bold text-[#2C3E50] mb-4">
              Atribuciones
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Las atribuciones del Viceministerio de Lucha Contra el
              Contrabando, en el marco de las competencias asignadas al nivel
              central por la Constitución Política del Estado, son las
              siguientes: <strong>a) Elaborar e implementar políticas y estrategias de
              lucha contra el contrabando en coordinación con la Aduana Nacional
              y las Fuerzas Armadas. b) Proponer y suscribir, convenios y/o
              acuerdos con entidades del sector público y/o privado, para la
              lucha contra el contrabando. c) Vigilar el cumplimiento de las
              normas nacionales sobre la lucha contra el contrabando. d)
              Requerir información a las Fuerzas Armadas que permita evaluar
              resultados en el marco de las operaciones realizadas de lucha
              contra el contrabando. e) Coordinar y articular con las Fuerzas
              Armadas y con la Policía Boliviana, a través del Ministerio de
              Gobierno, en tareas de lucha contra el contrabando.</strong>
            </p>
          </div>
          {/* Textos explicativos de categorías */}
          
          <div className="mb-6 bg-gray-100 p-4 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800">CATEGORÍAS TOMADAS EN CUENTA:</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>
                    <span className="font-bold text-gray-800">OPERACIÓN GENERAL:</span> 
                    Incluye todas las acciones estratégicas y tácticas realizadas por las unidades operativas del Viceministerio de Lucha Contra el Contrabando. Estas abarcan patrullajes móviles y a pie, evacuaciones de áreas críticas, enfrentamientos con contrabandistas, y otras actividades enfocadas en desmantelar redes de contrabando y proteger la integridad de las fronteras del país.
                </li>
                <li>
                    <span className="font-bold text-gray-800">MERCADERÍA:</span> 
                    Hace referencia a los bienes incautados durante las operaciones. Entre ellos se encuentran alimentos no aptos para consumo, productos enlatados, equipos electrónicos de dudosa procedencia, carburantes almacenados ilegalmente, divisas no declaradas, y sustancias controladas que ingresaron al país de manera ilegal.
                </li>
                <li>
                    <span className="font-bold text-gray-800">VEHÍCULO:</span> 
                    Agrupa los automóviles, camiones, motocicletas, embarcaciones y otros medios de transporte que fueron utilizados para el traslado de contrabando. Estos vehículos son detenidos en los puntos de control o durante operativos en ruta y, dependiendo de su estado, pueden ser retenidos o puestos a disposición de las autoridades competentes.
                </li>
                <li>
                    <span className="font-bold text-gray-800">INCINERADO:</span> 
                    Se refiere a los vehículos comisados que, por su uso en actividades ilegales o su estado, no pueden ser reutilizados ni subastados, y son incinerados como medida preventiva. Este procedimiento se lleva a cabo siguiendo estrictos protocolos legales para evitar riesgos ambientales y sanitarios.
                </li>
                <li>
                    <span className="font-bold text-gray-800">GRIA:</span> 
                    Representa los comisos realizados por los Grupos de Reacción Inmediata Aduanera (GRIA), unidades especializadas en responder de manera rápida y eficiente ante actividades sospechosas de contrabando. Estos equipos operan en zonas estratégicas y utilizan tecnología avanzada para interceptar bienes ilegales.
                </li>
            </ul>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
