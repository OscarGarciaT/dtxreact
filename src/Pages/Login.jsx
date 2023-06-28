import React from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearLoginErrors, submitLogin } from "../slices/loginSlice";
import { registerUser } from "../services/loginServices";

const registerData = {
  email: "oscar@dentelx.com",
  password: "abc123",
  nombres: "Oscar",
  apellidos: "Garcia",
  cargo: "DENTISTA",
  telefono: "0919821232"
};

const Login = () => {
  const login = useSelector(({ login }) => login)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: "onSubmit" });

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
      dispatch(clearLoginErrors())
      dispatch(submitLogin(data))
      console.log({ data });
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Couldn't verify information",
      });
    }
  };

  return (
    <Box
      className={`w-screen h-screen flex justify-center items-center bg-white select-none ${
        login?.inProgress ? "opacity-70 pointer-events-none" : ""
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
            {!login?.inProgress ? (
              <Typography variant="body2">Login in</Typography>
            ) : (
              <CircularProgress size="1.25rem" sx={{ color: "white" }} />
            )}
          </Button>
          {!!login?.errors.length && login?.errors.map((err, i) => (<Alert key={i} severity="error">{err?.message}</Alert>) ) }
        </Box>
      </Box>
      <Box className="w-3/5 h-screen bg-opacity-100 bg-no-repeat bg-cover bg-[url('/assets/img/stockDent.jpg')]  max-sm:hidden">
        <Box className="w-5/5 h-screen bg-gray-900 bg-opacity-25  max-sm:hidden overflow-auto" />
      </Box>
    </Box>
  );
};

export default Login;
