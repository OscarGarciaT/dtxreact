import { Routes, Navigate, Route, Outlet } from "react-router-dom";
import Calendario from "../Pages/Calendario";

// Pages
import Login from "../Pages/Login";
import Pacientes from "../Pages/Pacientes";
import DtxLayout from "./Navigation/DtxLayout";
import Test from "../Pages/Test"

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
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/test" element={<Test />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
