import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import DefenseLogo from "../assets/images/logo.jpeg";
import InicioLogo from "../assets/images/casita.svg";
import IncautacionLogo from "../assets/images/incautaciones.svg";
import InventarioLogo from "../assets/images/inventario.svg";
import EstadisticaLogo from "../assets/images/estadisticas.svg";
import TendenciaLogo from "../assets/images/tendencias.svg";
import UsuarioLogo from "../assets/images/casita.svg"

const Sidebar = () => {
    
  const { user } = useContext(UserContext);
  console.log("User data in context:", user);


  return (
    <div className="sidebar">
      <img src={DefenseLogo} alt="Ministerio de Defensa" />
      <nav>
        <Link to="/dashboard">
          <img src={InicioLogo} alt=""/>Inicio
        </Link>
        {(user?.role === "Administrador"|| user?.role === 'Operador') && (
          <Link to="/incautaciones">
            Incautaciones
          </Link>
        )}
        {(user?.role === 'Administrador' || user?.role === 'Operador' || user?.role === 'Analista') && (
                <>
        <Link to="/inventario">
          <img src={InventarioLogo} alt="" />Inventario
        </Link>
        <Link to="/estadisticas">
          <img src={EstadisticaLogo} alt="" />Estadísticas
        </Link>
        <Link to="/tendencias">
          <img src={TendenciaLogo} alt="" />Tendencias
        </Link>
        <Link to="/user-details">
          {" "}
          <img src={UsuarioLogo} alt="" />Usuario
        </Link>
        </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
