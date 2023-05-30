import { Routes, Navigate, Route } from "react-router-dom";

// Pages
import Login from "../Pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login2" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
