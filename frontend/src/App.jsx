import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserProvider, { UserContext } from "./contexts/UserContext";
import LoginUser from "./pages/LoginUser";
import Dashboard from "./pages/Dashboard";
import Incautaciones from "./pages/Incautaciones";
import Inventario from "./pages/Inventario";
import Estadisticas from "./pages/Estadisticas";
import Tendencias from "./pages/Tendencias";
import UserProfile from "./pages/UserProfile";
import UserDetails from "./pages/UserDetails";
import UserManagement from './pages/UserManagement';

//PrivateRoute Component to check authentication
const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? children : <Navigate to="/" />;
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



// import React, { useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import UserProvider, { UserContext } from "./contexts/UserContext";
// import LoginUser from "./pages/LoginUser";
// import RegisterUser from "./pages/RegisterUser";
// import Dashboard from "./pages/Dashboard";
// import Incautaciones from "./pages/Incautaciones";
// import Inventario from "./pages/Inventario";
// import Estadisticas from "./pages/Estadisticas";
// import Tendencias from "./pages/Tendencias";
// import UserProfile from "./pages/UserProfile";

// function App() {
//   const { user } = useContext(UserContext);

//   // PrivateRoute Component to check authentication
//   const PrivateRoute = ({ children }) => {
//     return user ? children : <Navigate to="/" />;
//   };

//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LoginUser />} />
//           <Route path="/register" element={<RegisterUser />} />
          
//           {/* Private Routes */}
//           <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//           <Route path="/incautaciones" element={<PrivateRoute><Incautaciones /></PrivateRoute>} />
//           <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} />
//           <Route path="/estadisticas" element={<PrivateRoute><Estadisticas /></PrivateRoute>} />
//           <Route path="/tendencias" element={<PrivateRoute><Tendencias /></PrivateRoute>} />
//           <Route path="/perfil" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;
