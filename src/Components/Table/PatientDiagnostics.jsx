import { useState } from "react";

import {
  FormControlLabel,
  Icon,
  IconButton, Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";

const PatientDiagnostics = (props) => {
  const isEditMode = props?.isEditMode;
  const [diagnosticos] = useState([]);

  return (
    <div>
      <div className="flex gap-2">
        <Typography variant="h6" fontWeight="bold" className="self-start my-3">
          11. Diagnóstico
        </Typography>
        <IconButton disabled={!isEditMode}>
          <Icon color={isEditMode ? "primary" : undefined}>add_circle</Icon>
        </IconButton>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">
                PRE=PRESUNTIVO / DEF=DEFINITIVO
              </TableCell>
              <TableCell align="center">CIE</TableCell>
              <TableCell align="center">PRE/DEF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEditMode ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">
                      Es necesario crear el paciente para agregar Diagnosticos
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : !diagnosticos.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">Sin registros</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              diagnosticos.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                  <TableCell align="right">
                    <TextField fullWidth />
                  </TableCell>
                  <TableCell align="right">
                    <TextField fullWidth />
                  </TableCell>
                  <TableCell className="flex flex-col items-center justify-center">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Pre"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Def"
                      />
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientDiagnostics;
