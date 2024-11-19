import React, { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Sidebar from "../components/Sidebar";
import InicioLogo from "../assets/images/inicioimag.png";
import UserIcon from "../assets/icons/usericon.png";

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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
