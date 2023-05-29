import { Routes, Navigate, Route } from "react-router-dom";

// Pages
import Login from "../Pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
