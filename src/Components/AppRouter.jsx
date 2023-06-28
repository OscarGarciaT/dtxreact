import { Routes, Navigate, Route, Outlet } from "react-router-dom";

// Pages
import Login from "../Pages/Login";
import Pacientes from "../Pages/Pacientes";
import DtxLayout from "./Navigation/DtxLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <div>
            <DtxLayout render={<Outlet />} />
          </div>
        }
      >
        <Route path="/pacientes" element={<Pacientes />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
