import { Routes, Navigate, Route, Outlet } from "react-router-dom";

// Pages
import Login from "../Pages/Login";
import Placeholder from "../Pages/Placeholder";
import DtxLayout from "./Navigation/DtxLayout";
import PatientInfo from "../Pages/PatientInfo"

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
        <Route
          path="/pacientes"
          element={<Placeholder text={"Pantalla Pacientes"} />}
        />
        <Route path="/test" element={<Placeholder text={"Pantalla Test"} />} />
        <Route path="/patient" element={<PatientInfo />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
