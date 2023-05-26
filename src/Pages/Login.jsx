import { Box, Button, Icon, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const Login = (props) => {
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
      // Login async request to API
      // TODO: Services
      throw new Error("foobar");
    } catch (err) {
      setError("email", {
        type: "custom",
        message: "Couldn't verify information",
      });
    }
  };

  return (
    <Box className="w-screen h-screen flex justify-center items-center bg-white select-none">
      <Box className="w-2/5 max-sm:w-full flex flex-col items-center">
        <img
          src={"/assets/img/Logo.png"}
          alt="DentelX Logo"
          className="mb-10"
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
            endIcon={<Icon>navigate_next</Icon>}
          >
            Login in
          </Button>
        </Box>
      </Box>
      <Box className="w-3/5 h-screen bg-lime-200 max-sm:hidden" />
    </Box>
  );
};

export default Login;
