import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../assets/icons/usericon.png";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../contexts/UserContext";

const UserDetails = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    if (!user?.token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/me/", {
        headers: {
          Authorization: `Token ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setUserData(response.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data: {error.message}</p>;

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

        {/* Detalles del Usuario */}
        <div className="flex flex-col items-center justify-start flex-1 p-8 bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-6">
              Detalles del Usuario
            </h2>
            {userData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre de Usuario */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Nombre de Usuario:
                  </label>
                  <p className="mt-1 p-2 border rounded bg-gray-50">
                    {userData.username}
                  </p>
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Correo Electrónico:
                  </label>
                  <p className="mt-1 p-2 border rounded bg-gray-50">
                    {userData.email}
                  </p>
                </div>

                {/* Nombre Completo */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Nombre Completo:
                  </label>
                  <p className="mt-1 p-2 border rounded bg-gray-50">
                    {userData.full_name}
                  </p>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Teléfono:
                  </label>
                  <p className="mt-1 p-2 border rounded bg-gray-50">
                    {userData.phone}
                  </p>
                </div>

                {/* Rol */}
                <div>
                  <label className="block font-bold text-gray-700">Rol:</label>
                  <p className="mt-1 p-2 border rounded bg-gray-50">
                    {userData.role}
                  </p>
                </div>

                {/* Botón de gestionar usuarios (solo para administrador) */}
                {userData.role === "Administrador" && (
                  <div className="col-span-2 flex justify-center mt-4">
                    <button
                      onClick={() =>
                        (window.location.href = "http://127.0.0.1:8000/admin")
                      }
                      className="bg-[#2980B9] text-white px-6 py-2 rounded-lg hover:bg-[#2574A9] transition"
                    >
                      Gestionar Usuarios
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No hay datos del usuario disponibles
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
