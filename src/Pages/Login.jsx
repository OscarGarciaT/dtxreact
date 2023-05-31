import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const testLogin = {
  email: "test@dentelx.com",
  password: "123",
};

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: "onSubmit", defaultValues: testLogin });

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: "Invalid email address",
    },
  };

  const passwordValidation = {
    required: "Password is required",
  };

  const handleLogin = async (data) => {
    try {
      // TODO: Login backend logic
      setLoading(true);
      console.log({ data });
      await new Promise((resolve) => setTimeout(() => resolve(), 2000));
      navigate("/pacientes");
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Couldn't verify information",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className={`w-screen h-screen flex justify-center items-center bg-white select-none ${
        loading ? "opacity-70 pointer-events-none" : ""
      }`}
    >
      <Box className="w-2/5 max-sm:w-full flex flex-col items-center">
        <img
          src={"/assets/img/iconT.png"}
          alt="DentelX Logo"
          className="mb-1"
        />
        <Box className="w-3/5 flex flex-col items-center gap-y-3">
          <Typography
            variant="h4"
            fontWeight="bold"
            className="self-start"
            sx={{ marginBottom: "1rem" }}
          >
            Log in
          </Typography>
          <TextField
            fullWidth
            label="Email"
            {...register("email", emailValidation)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register("password", passwordValidation)}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: "1rem",
            }}
            onClick={handleSubmit(handleLogin)}
          >
            {!loading ? (
              <Typography variant="body2">Login in</Typography>
            ) : (
              <CircularProgress size="1.25rem" sx={{ color: "white" }} />
            )}
          </Button>
        </Box>
      </Box>
      <Box className="w-3/5 h-screen bg-opacity-100 bg-no-repeat bg-cover bg-[url('/assets/img/stockDent.jpg')]  max-sm:hidden">
        <Box className="w-5/5 h-screen bg-gray-900 bg-opacity-25  max-sm:hidden overflow-auto"/>  
      </Box>
    </Box>
  );
};

export default Login;
