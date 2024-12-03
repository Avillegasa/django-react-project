import React, { useContext } from "react";
import {
  BrowserRouter as Router, Navigate, Route, Routes
} from "react-router-dom";
import UserProvider, { UserContext } from "./contexts/UserContext";
import Dashboard from "./pages/Dashboard";
import Estadisticas from "./pages/Estadisticas";
import Incautaciones from "./pages/Incautaciones";
import Inventario from "./pages/Inventario";
import LoginUser from "./pages/LoginUser";
import Tendencias from "./pages/Tendencias";
import UserDetails from "./pages/UserDetails";
import UserManagement from './pages/UserManagement';
import UserProfile from "./pages/UserProfile";

//PrivateRoute Component to check authentication
const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    if (!user) {
      return <Navigate to="/" />;
    }
  
    return children;
  };


function App() {
 

  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginUser />} />
          {/* Private Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/incautaciones" element={<PrivateRoute><Incautaciones /></PrivateRoute>} />
          <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} />
          <Route path="/estadisticas" element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
          <Route path="/tendencias" element={<PrivateRoute><Tendencias /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/user-details" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
          <Route path="/manage-users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
        
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

