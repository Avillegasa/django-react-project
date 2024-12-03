// Sidebar.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LogoEstadistica from "../assets/icons/estadisicon.svg";
import LogoIncautacion from "../assets/icons/incauicon.svg";
import LogoInicio from "../assets/icons/inicioicon.svg";
import LogoInventario from "../assets/icons/invenicon.svg";
import LogoTendencia from "../assets/icons/tendenicon.svg";
import LogoUsuario from "../assets/icons/usericon.png";
import MinLogo from '../assets/images/mindef.png';
import { UserContext } from "../contexts/UserContext";

const Sidebar = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-[#2980B9] text-white min-h-screen w-64 flex flex-col items-center py-8">
      {/* Logo */}
      <Link to='/dashboard'>
        <img src={MinLogo} alt="Ministerio de Defensa" className="w-full h-auto mb-0" />
      </Link>
      {/* Links de Navegación */}
      <nav className="w-full flex flex-col items-start px-4 space-y-6">
        {/* Link Inicio */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
        >
          <img src={LogoInicio} alt="Inicio" className="w-6 h-6" />
          <span>Inicio</span>
        </Link>

        {/* Link Incautaciones */}
        {(user?.role === "admin" || user?.role === "operador") && (
          <Link
            to="/incautaciones"
            className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
          >
            <img src={LogoIncautacion} alt="Incautaciones" className="w-6 h-6" />
            <span>Incautaciones</span>
          </Link>
        )}

        {/* Links comunes (Inventario, Estadísticas, Tendencias, Usuario) */}
        {(user?.role === "admin" || user?.role === "operador" || user?.role === "analista") && (
          <>
            <Link
              to="/inventario"
              className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
            >
              <img src={LogoInventario} alt="Inventario" className="w-6 h-6" />
              <span>Inventario</span>
            </Link>
            <Link
              to="/estadisticas"
              className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
            >
              <img src={LogoEstadistica} alt="Estadísticas" className="w-6 h-6" />
              <span>Estadísticas</span>
            </Link>
            <Link
              to="/tendencias"
              className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
            >
              <img src={LogoTendencia} alt="Tendencias" className="w-6 h-6" />
              <span>Tendencias</span>
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/user-details"
                className="flex items-center space-x-2 text-lg hover:bg-[#2574A9] px-4 py-2 rounded-lg w-full"
              >
                <img src={LogoUsuario} alt="Usuario" className="w-6 h-6" />
                <span>Usuario</span>
              </Link>
            )}
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
