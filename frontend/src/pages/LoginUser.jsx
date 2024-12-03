import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/loginizq.png";
import loginMinis from "../assets/images/logo.png";
import DefenseLogo from "../assets/images/mindef.png";
import { UserContext } from "../contexts/UserContext";

const LoginUser = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, role } = response.data;
      localStorage.setItem("userToken", token); // Guardamos el token
      localStorage.setItem("role", role); // Guardamos el rol

      // Almacena el token y el rol en el contexto de usuario
      setUser({ token, role });

      // Redirige a la página de dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Login error: ${error.response.data.error}`);
      } else {
        console.error("Error:", error);
        alert("Error durante el inicio de sesión");
      }
    }
  };
  return (
    <div className="min-h-screen flex relative">
      {/* Sección Izquierda */}
      <div
        className="w-1/2 relative"
        style={{
          backgroundColor: "#2980B9",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center p-8">
          <img
            src={DefenseLogo}
            alt="Ministerio de Defensa"
            className="mb-4 w-300 h-260"
          />
          <h1
            className="text-[70px] font-normal font-serif"
            style={{ fontFamily: "'notoSansOldItalic', sans-serif" }}
          >
            S I C O S E
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-2/5 mt-8 space-y-4"
          >
            <input
              type="text"
              name="username"
              placeholder="Correo electrónico"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-2 py-2 text-white placeholder-white-300 bg-transparent border-b border-white focus:outline-none focus:ring-0 focus:border-blue-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-2 py-2 text-white placeholder-white-300 bg-transparent border-b border-white focus:outline-none focus:ring-0 focus:border-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#2980B9] text-white font-bold rounded-full hover:bg-[#2574A9] transition-transform transform hover:scale-105"
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Línea Sombra */}
      <div className="w-[4px] bg-gradient-to-b from-black to-gray-800 shadow-xl"></div>

      {/* Sección Derecha */}
      <div
        className="w-1/2 relative"
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-75 flex flex-col justify-evenly items-center px-4 md:px-8 py-8">
          {/* Primera sección */}
          <div className="w-full flex justify-center items-center mb-4">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-center px-2"
            style={{ fontFamily: "'notoSansOldItalic', sans-serif" }}>
              Sistema de Control, Seguimiento y Análisis Estadístico de
              Mercancía Incautada por el Viceministerio de Lucha Contra el
              Contrabando
            </h1>
          </div>

          {/* Segunda sección: Imagen PNG */}
          <div className="w-full flex justify-center items-center mb-4">
            <img
              src={loginMinis}
              alt="Ministerio de Defensa Logo"
              className="w-100 h-auto"
            />
          </div>

          {/* Tercera sección */}
          <div className="w-full flex justify-center items-center">
            <p className="text-center text-xs md:text-sm lg:text-base leading-relaxed px-4 md:px-6"
            style={{ fontFamily: "'notoSansOldItalic', sans-serif" }}>
              El Decreto Supremo N°3540 establece que con el fin de implementar
              políticas y estrategias de lucha contra el contrabando y
              fortalecer los mecanismos de coordinación interinstitucional, es
              necesario crear un Viceministerio en la estructura del Ministerio
              de Defensa, para que de manera articulada coadyuve en tareas de
              lucha contra el contrabando con la Aduana Nacional de Bolivia, las
              Fuerzas Armadas y con la Policía Boliviana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
