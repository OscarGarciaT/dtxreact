import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExpiredWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Paper className="flex flex-col items-center p-10 gap-4">
        <Typography variant="h5">Sesión expirada</Typography>
        <Typography variant="caption">Por favor, inicia sesión nuevamente</Typography>
        <Button variant="contained" onClick={() => navigate('/login')}>Regresar al inicio</Button>
      </Paper>
    </div>
  );
};

export default ExpiredWarning