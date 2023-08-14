import React from 'react';
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
import { useState } from "react";
import usePatients from "../utils/hooks/usePatients";
import dayjs from "dayjs";

const PacientesTable = ({ handleEditPatient }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { register, watch } = useForm();
  const search = watch("search");

  const patients = usePatients(searchQuery);

  useDebounceEffect(
    () => {
      setSearchQuery(search);
    },
    350,
    [search]
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
              <TableCell>Cedula</TableCell>
              <TableCell>Nombres</TableCell>
              <TableCell align="left">Apellidos</TableCell>
              <TableCell align="left">Contacto</TableCell>
              <TableCell align="left">Ultima Cita</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!patients.length ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">
                      No se han registrado pacientes
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              patients?.map((paciente, index) => (
                <TableRow key={index}>
                  <TableCell>{paciente?.cedula}</TableCell>
                  <TableCell align="left">{paciente?.nombres}</TableCell>
                  <TableCell align="left">{paciente?.apellidos}</TableCell>
                  <TableCell align="left">{paciente?.celular}</TableCell>
                  <TableCell align="left">

                    <div>
                      {paciente?.tratamientos[paciente.tratamientos.length - 1]?.fecha ? (
                        <p>{dayjs(paciente?.tratamientos[paciente.tratamientos.length - 1]?.fecha).format("DD/MM/YY")}</p>
                      ) : (
                        <p>Sin ultima cita</p>
                      )}
                    </div>

                  </TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleEditPatient(paciente)}>
                      <Icon data-testid="edit-button-s" color="primary">
                        edit_square
                      </Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const Pacientes = () => {
  const dispatch = useDispatch();

  const handleCreatePatient = () => {
    dispatch(
      pushDialog({ id: "CREATE_PATIENT_VIEW", props: { mode: "CREATE" } })
    );
  };

  const handleEditPatient = (patientData) => {
    dispatch(pushDialog({ id: "EDIT_PATIENT_VIEW", props: { mode: "EDIT", patientData } }));
  };

  return (
    <Box padding={3} display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" columnGap={2} paddingBottom={1}>
        <Icon color="primary">groups</Icon>
        <Typography variant="h5">Pacientes</Typography>
        <Box flexGrow={1} />
        <IconButton onClick={handleCreatePatient} data-testid="add-button">
          <Icon color="primary">add_circle</Icon>
        </IconButton>
      </Box>
      <Divider />
      <PacientesTable handleEditPatient={handleEditPatient} />
    </Box>
  );
};

export default Pacientes;
