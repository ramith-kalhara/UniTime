import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/Admin.jsx";
import AuthLayout from "./layouts/Auth.jsx";
import UserLayout from "./layouts/User.jsx";
import Register from "./views/user/Register.jsx";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  // Move useLocation hook inside BrowserRouter
  return (
    <BrowserRouter>
      <LocationHandler />
    </BrowserRouter>
  );
}

function LocationHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) {
      import("./assets/admin/scss/argon-dashboard-react.scss");
      import("./assets/admin/plugins/nucleo/css/nucleo.css");
      import("@fortawesome/fontawesome-free/css/all.min.css");
    } else if (location.pathname.startsWith("/user")) {
      import("./assets/user/css/style.min.css");
      import("./assets/user/css/style.css");
    } else if (location.pathname.startsWith("/register")){
      import("./assets/Register/register.css")
    }
  }, [location]);

  return (
    <Routes>
    <Route
      path="/admin/*"
      element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    />
  
    <Route
      path="/user/*"
      element={
        <ProtectedRoute allowedRoles={["USER"]}>
          <UserLayout />
        </ProtectedRoute>
      }
    />
  
    <Route path="/auth/*" element={<AuthLayout />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<Navigate to="/register" replace />} />
  </Routes>
  );
}

export default App;
