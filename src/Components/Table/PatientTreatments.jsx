import { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Button,
  TableHead,
  Typography,
  IconButton,
  Icon,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

const NewRow = ({ rTratamientos, setRTratamientos }) => {
  const [session, setSession] = useState("");
  const [date, setDate] = useState("");
  const [diag, setDiag] = useState("");
  const [proced, setProced] = useState("");
  const [pres, setPres] = useState("");
  const [code, setCode] = useState("");
  const [sign, setSign] = useState("");

  const addTreatmentRow = () => {
    const tratamiento = {
      session: session,
      date: date,
      diag: diag,
      proced: proced,
      pres: pres,
      code: code,
      sign: sign,
    };
    addTreatment(tratamiento);
  };

  const addTreatment = (tratamiento) => {
    console.log("Tratamiento:", tratamiento);
    const newTratamientos = [...rTratamientos, tratamiento];
    setRTratamientos(newTratamientos);
    console.log(newTratamientos);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableRow className="flex flex-row items-center justify-center">
            <TableCell component="th" scope="row">
              <TextField
                multiline
                label="Sesion"
                value={session}
                onChange={(event) => setSession(event.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <input
                type="date"
                className="h-10"
                value={date}
                onChange={(event) =>
                  setDate(event.target.value ? event.target.value : new Date())
                }
              />
            </TableCell>
            <TableCell align="right" label="diagnosticos">
              <TextField
                multiline
                fullWidth
                value={diag}
                onChange={(event) => setDiag(event.target.value)}
              />
            </TableCell>
            <TableCell align="right" label="procedimientos">
              <TextField
                multiline
                fullWidth
                value={proced}
                onChange={(event) => setProced(event.target.value)}
              />
            </TableCell>
            <TableCell align="right" label="prescripciones">
              <TextField
                multiline
                fullWidth
                value={pres}
                onChange={(event) => setPres(event.target.value)}
              />
            </TableCell>
            <TableCell>
              <TextField
                label="Código"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </TableCell>
            <TableCell align="right">
              <TextField
                label="Firma"
                defaultValue="Nicole Ávila"
                value={sign}
                onChange={(event) => setSign(event.target.value)}
              />
            </TableCell>
            <Button variant="contained" onClick={addTreatmentRow}>
              <SendIcon />
            </Button>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
};

const PatientTreatments = (props) => {
  const isEditMode = props?.isEditMode;

  const [rTratamientos, setRTratamientos] = useState([]);

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <Typography variant="h6" fontWeight="bold" className="self-start my-3">
          12. Tratamiento
        </Typography>
        <IconButton disabled={!isEditMode}>
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
            ) : !rTratamientos.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">
                      Sin registros
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              rTratamientos.map((row, index) => (
                <TableRow
                  align="center"
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.session}
                  </TableCell>
                  <TableCell align="right">{row.date}</TableCell>
                  <TableCell>{row.diag}</TableCell>
                  <TableCell>{row.proced}</TableCell>
                  <TableCell align="center">{row.pres}</TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="right">{row.sign}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientTreatments;
