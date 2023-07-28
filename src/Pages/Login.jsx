import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Icon,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearLoginErrors,
  setloginStatus,
  submitLogin,
  submitSignUp,
} from "../slices/loginSlice";
import DtxTextField from "../Components/Form/DtxTextField";
import DtxSelect from "../Components/Form/DtxSelect";

const LoginForm = () => {
  const login = useSelector(({ login }) => login);
  const dispatch = useDispatch();

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
      dispatch(clearLoginErrors());
      dispatch(submitLogin(data));
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Couldn't verify information",
      });
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(handleLogin)();
    }
  };

  const handleSignUpForm = () => {
    dispatch(setloginStatus("signup"));
  };

  return (
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
        onKeyDown={handleEnterPress}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register("password", passwordValidation)}
        error={!!errors.password}
        helperText={errors.password?.message}
        onKeyDown={handleEnterPress}
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
      <Link onClick={handleSignUpForm} className="self-start mt-2">
        Registrar una nueva cuenta
      </Link>
      {!!login?.errors.length &&
        login?.errors.map((err, i) => (
          <Alert key={i} severity="error">
            {err?.message}
          </Alert>
        ))}
    </Box>
  );
};

const SignUpForm = () => {
  const login = useSelector(({ login }) => login);
  const dispatch = useDispatch();

  const { control, handleSubmit, setError } = useForm({ mode: "onSubmit" });

  const handleSignUp = async (data) => {
    try {
      dispatch(clearLoginErrors());
      dispatch(submitSignUp(data));
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Couldn't verify information",
      });
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(handleSignUp)();
    }
  };

  const handleLoginForm = () => {
    dispatch(setloginStatus("login"));
  };

  return (
    <Box className="w-3/5 flex flex-col items-center gap-y-3">
      <Typography
        variant="h4"
        fontWeight="bold"
        className="self-start"
        sx={{ marginBottom: "1rem" }}
      >
        Registro
      </Typography>

      <div className="flex gap-x-1 justify-between">
        <DtxTextField
          fullWidth
          control={control}
          label="Nombres"
          name="nombres"
          pattern={/^[A-Za-z ]+$/g}
          patternMessage={"Solo se aceptan letras y espacios"}
          onKeyDown={handleEnterPress}
          required={"Los nombres no pueden estar vacios"}
        />
        <DtxTextField
          fullWidth
          control={control}
          label="Apellidos"
          name="apellidos"
          pattern={/^[A-Za-z ]+$/g}
          patternMessage={"Solo se aceptan letras y espacios"}
          onKeyDown={handleEnterPress}
          required={"Los apellidos no pueden estar vacios"}
        />
      </div>
      <DtxTextField
        fullWidth
        control={control}
        label="Email"
        name="email"
        pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
        patternMessage={"Email invalido"}
        onKeyDown={handleEnterPress}
        required={"Email es requerido"}
      />
      <DtxTextField
        fullWidth
        control={control}
        label="Password"
        name="password"
        type="password"
        onKeyDown={handleEnterPress}
        required={"Contraseña es requerida"}
      />
      <div className="flex gap-x-1 justify-between">
        <DtxSelect
          fullWidth
          control={control}
          name={"cargo"}
          label="Rol"
          options={[
            { label: "Dentista", value: "DENTISTA" },
            { label: "Ortodoncista", value: "ORTODONCISTA" },
          ]}
          defaultValue="DENTISTA"
        />
        <DtxTextField
          control={control}
          label="Telefono"
          name="telefono"
          pattern={/^\d{10}$/g}
          patternMessage={"# Telefono invalido"}
          onKeyDown={handleEnterPress}
        />
      </div>
      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: "1rem",
        }}
        onClick={handleSubmit(handleSignUp)}
      >
        {!login?.inProgress ? (
          <Typography variant="body2">Registrarse</Typography>
        ) : (
          <CircularProgress size="1.25rem" sx={{ color: "white" }} />
        )}
      </Button>
      <Link onClick={handleLoginForm} className="self-start mt-2">
        Regresar al inicio de sesion
      </Link>
      {!!login?.errors.length &&
        login?.errors.map((err, i) => (
          <Alert key={i} severity="error">
            {err?.message}
          </Alert>
        ))}
    </Box>
  );
};

const LoginSuccesful = () => {
  return (
    <Box className="w-3/5 flex flex-col items-center gap-y-3">
      <div className="flex flex-row items-center justify-center">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ marginBottom: "1rem" }}
        >
          Login Exitoso
        </Typography>
        <Icon color="success" fontSize="large" className="ml-3 -mt-3">
          check_circle
        </Icon>
      </div>
      <Typography
        variant="caption"
        className="self-start flex flex-row items-center justify-center"
        sx={{ marginBottom: "1rem" }}
      >
        Espera un momento para ser redireccionado o refresca la pagina
      </Typography>
    </Box>
  );
};

const Login = () => {
  const login = useSelector(({ login }) => login);

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
        {login.status === "login" && <LoginForm />}
        {login.status === "signup" && <SignUpForm />}
        {!login.status && <LoginSuccesful />}
      </Box>
      <Box className="w-3/5 h-screen bg-opacity-100 bg-no-repeat bg-cover bg-[url('/assets/img/stockDent.jpg')]  max-sm:hidden">
        <Box className="w-5/5 h-screen bg-gray-900 bg-opacity-25  max-sm:hidden overflow-auto" />
      </Box>
    </Box>
  );
};

export default Login;
