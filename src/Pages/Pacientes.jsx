import {
  Box,
  Divider,
  Icon,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import useDebounceEffect from "../utils/hooks/useDebounceEffect";
import { useDispatch } from "react-redux";
import { pushDialog } from "../slices/dialogSlice";
import { useNavigate } from "react-router";

const pacientesMock = [
  {
    nombres: "Oscar Moises",
    apellidos: "Garcia Tinoco",
    telefono: "0939621218",
    ultima_cita: "31/5/2023",
  },
  {
    nombres: "Sebastian",
    apellidos: "Rivera",
    telefono: "0912345678",
    ultima_cita: "30/5/2023",
  },
];

const PacientesTable = () => {
  const { register, watch } = useForm();

  const formData = watch();
  const navigate = useNavigate();

  useDebounceEffect(
    () => {
      console.log(formData);
    },
    350,
    [formData]
  );

  return (
    <>
      <Box display="flex" alignItems="center" columnGap={2} padding={2}>
        <TextField
          {...register("search")}
          label="Buscar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
        <Box flexGrow={1} />
      </Box>
      <Divider />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell align="left">Apellidos</TableCell>
              <TableCell align="left">Contacto</TableCell>
              <TableCell align="left">Ultima Cita</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pacientesMock.map((paciente, index) => (
              <TableRow key={index}>
                <TableCell align="left">{paciente.nombres}</TableCell>
                <TableCell align="left">{paciente.apellidos}</TableCell>
                <TableCell align="left">{paciente.telefono}</TableCell>
                <TableCell align="left">{paciente.ultima_cita}</TableCell>
                <TableCell align="left">
                  <IconButton>
                    <Icon color="primary" onClick={() => navigate("/patient")}>
                      edit_square
                    </Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Pacientes = () => {
  const dispatch = useDispatch();

  return (
    <Box padding={3} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" columnGap={2} paddingBottom={1}>
        <Icon color="primary">groups</Icon>
        <Typography variant="h5">Pacientes</Typography>
        <Box flexGrow={1} />
        <IconButton
          onClick={() => dispatch(pushDialog({ id: "CREATE_PATIENT_VIEW" }))}
        >
          <Icon color="primary">add_circle</Icon>
        </IconButton>
      </Box>
      <Divider />
      <PacientesTable />
    </Box>
  );
};

export default Pacientes;
