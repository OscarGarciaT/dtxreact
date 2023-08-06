import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Typography,
  IconButton,
  Icon,
} from "@mui/material";

import { Controller, useFieldArray } from "react-hook-form";
import DtxTextField from "../Form/DtxTextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const PatientTreatments = (props) => {
  const isEditMode = props?.isEditMode;
  const control = props?.control;

  const {
    fields: tratamientos,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "tratamientos",
  });

  const addNewTreatment = () => {
    append({
      number: tratamientos.length + 1,
      fecha: dayjs(),
      diag: "",
      proced: "",
      pres: "",
      cod: "",
      firma: "",
      canEdit: true,
    });
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <Typography variant="h6" fontWeight="bold" className="self-start my-3">
          12. Tratamiento
        </Typography>
        <IconButton disabled={!isEditMode} onClick={addNewTreatment}>
          <Icon color={isEditMode ? "primary" : undefined}>add_circle</Icon>
        </IconButton>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SESIÓN</TableCell>
              <TableCell align="center">FECHA</TableCell>
              <TableCell align="center">
                DIAGNOSTICOS Y COMPLICACIONES
              </TableCell>
              <TableCell align="center">PROCEDIMIENTOS</TableCell>
              <TableCell align="center">PRESCRIPCIONES</TableCell>
              <TableCell align="center">CÓDIGO </TableCell>
              <TableCell align="center">FIRMA </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEditMode ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">
                      Es necesario crear el paciente para agregar Tratamientos
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : !tratamientos.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">Sin registros</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              tratamientos.map((row, index) => {
                const canEdit = row.canEdit;

                return (
                  <TableRow
                    align="center"
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.number`}
                        label={""}
                        viewMode={true}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ width: "210px" }}>
                      {canEdit ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <Controller
                            name={`tratamientos.${index}.fecha`}
                            defaultValue={dayjs()}
                            control={control}
                            render={({ field }) => <DatePicker {...field} />}
                          />
                        </LocalizationProvider>
                      ) : (
                        <Typography>
                          {dayjs(row.fecha).format("DD/MM/YY")}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.diag`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell>
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.proced`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.pres`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.cod`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <DtxTextField
                        control={control}
                        name={`tratamientos.${index}.firma`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      className={`${
                        !canEdit
                          ? "pointer-events-none opacity-75 grayscale"
                          : ""
                      }`}
                    >
                      {canEdit && (
                        <IconButton onClick={() => remove(index)}>
                          <Icon color="error">close</Icon>
                        </IconButton>
                      )}

                      {!canEdit && <Typography> - </Typography>}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientTreatments;
