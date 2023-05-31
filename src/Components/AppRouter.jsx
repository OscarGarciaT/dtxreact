import { Routes, Navigate, Route, Outlet } from "react-router-dom";
import DtxLayout from "./Navigation/DtxLayout";

// Pages
import Login from "../Pages/Login";
import Placeholder from "../Pages/Placeholder";
import PatientInfo from "../Pages/PatientInfo";
import Pacientes from "../Pages/Pacientes";

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
        <Route path="/test" element={<Placeholder text={"Pantalla Test"} />} />
        <Route path="/patient" element={<PatientInfo />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
