import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "../Components/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PatientInfo = () => {
  const longText = {
    width: "100%",
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const printButtonLabel = (event) => {
    console.log(event.target.name);
    //do some stuff here
  };

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState();
  const handleCheck = (e) => {
    setCheckboxValue(e.target.value);
    setIsDisabled(true);
  };

  const numeros = [1, 2, 3, 4];

  const tratamientos = [
    {
      sesion: 1,
      fecha: new Date("Jul 12 2021"),
      diagnostico: "K036",
      procedimiento: "D1110, D4910",
      prescripciones: "",
      codigo: "",
      firma: "Nicole Ávila",
    },
    {
      sesion: 2,
      fecha: new Date("Jul 20 2021"),
      diagnostico: "K021 pieza#11",
      procedimiento: "D2331",
      prescripciones: "",
      codigo: "",
      firma: "Nicole Ávila",
    },
    {
      sesion: 3,
      fecha: new Date("Jul 30 2021"),
      diagnostico: "K036",
      procedimiento: "D1110, D4910",
      prescripciones: "",
      codigo: "",
      firma: "Nicole Ávila",
    },
  ];

  const [showResults, setShowResults] = React.useState(false);

  const Results = () => (
    <div>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableRow>
          <TableCell component="th" scope="row">
            <TextField
              multiline
              label="Sesion"
              id="outlined-size-small"
            ></TextField>
          </TableCell>
          <TableCell align="right">FECHA</TableCell>
          <TableCell align="right">
            <input type="date"></input>
          </TableCell>
        </TableRow>
        <TableCell align="right" label="diagnosticos" id="outlined-size-small">
          <TextField
            multiline
            style={longText}
            id="outlined-size-small"
          ></TextField>
        </TableCell>
        <TableCell
          align="right"
          label="procedimientos"
          id="outlined-size-small"
        >
          <TextField
            multiline
            style={longText}
            id="outlined-size-small"
          ></TextField>
        </TableCell>
        <TableCell
          align="right"
          label="prescripciones"
          id="outlined-size-small"
        >
          <TextField
            multiline
            style={longText}
            id="outlined-size-small"
          ></TextField>
        </TableCell>
        <TableRow>
          <TableCell className="border border-slate-300">
            <TextField label="Código" id="outlined-size-small"></TextField>
          </TableCell>
          <TableCell className="border border-slate-300" align="right">
            <TextField label="Firma" defaultValue="Nicole Ávila"></TextField>
          </TableCell>
        </TableRow>
      </TableRow>
      <Button variant="contained" endIcon={<SendIcon />}>
        Guardar registro
      </Button>
    </div>
  );

  return (
    <div className="ml-3">
      <FormControl>
        <Box sx={{ width: "100%" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          ></Box>
          <br />
          <h1>Información General</h1>
          <br />
          <TextField
            disabled
            id="outlined-disabled"
            label="Cédula"
            defaultValue="0930939145"
          ></TextField>
          <TextField
            disabled
            id="outlined-disabled"
            label="Nombres"
            defaultValue="Eduardo Emilio"
          ></TextField>
          <TextField
            disabled
            id="outlined-disabled"
            label="Apellidos"
            defaultValue="Salavarría Gómez"
          ></TextField>
          <TextField
            disabled
            id="outlined-disabled"
            label="Celular"
            defaultValue="0990625269"
          ></TextField>
          <br />
          <br />
          <TextField
            disabled
            id="outlined-disabled"
            label="Sexo"
            defaultValue="Masculino"
          ></TextField>
          <TextField
            disabled
            id="outlined-disabled"
            label="Edad"
            defaultValue="21"
          ></TextField>
          <br />
          <br />
          <FormLabel id="demo-row-radio-buttons-group-label">
            Rango de Edad
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Menor a 18"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Entre 18 a 65"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Mayor a 65"
            />
          </RadioGroup>
          <br />

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Frontal" {...a11yProps(0)} />
              <Tab label="Posterior" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <div id="appointmentReason">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                1. Motivo de consulta
              </Typography>
              <TextField
                hiddenLabel
                multiline
                style={longText}
                id="outlined-size-small"
                defaultValue={"Vengo a hacerme una limpieza"}
              ></TextField>
            </div>

            <div id="currentDiseaseOrProblem">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                2. Enfermedad o Problema actual
              </Typography>
              <TextField
                hiddenLabel
                multiline
                style={longText}
                id="outlined-size-small"
                defaultValue={"Asintomático"}
              ></TextField>
            </div>

            <div id="familyHistory">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                3. Antecedentes Familiares
              </Typography>
              <FormControlLabel
                control={<Checkbox />}
                label="Alergia Antiobiótico"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Alergia Anestesia"
              />
              <FormControlLabel control={<Checkbox />} label="Hemorragias" />
              <FormControlLabel control={<Checkbox />} label="VIH Sida" />
              <FormControlLabel control={<Checkbox />} label="Tuberculosis" />
              <FormControlLabel control={<Checkbox />} label="Asma" />
              <FormControlLabel control={<Checkbox />} label="Diabetes" />
              <FormControlLabel control={<Checkbox />} label="Hipertensión" />
              <FormControlLabel control={<Checkbox />} label="Enf. Cardiaca" />
              <FormControlLabel
                control={<Checkbox />}
                label="Alergia Antiobiótico"
              />
              <FormControlLabel control={<Checkbox />} label="Otro" />

              <TextField
                hiddenLabel
                multiline
                style={longText}
                id="outlined-size-small"
                defaultValue={"No refiere antecedentes personales"}
              ></TextField>
            </div>

            <div id="vitalSigns">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                4. Signos Vitales
              </Typography>
              <TextField
                label="Presión Arterial"
                id="outlined-size-small"
                defaultValue={"144/70"}
              ></TextField>
              <TextField
                label="Frecuencia Cardiaca"
                id="outlined-size-small"
                defaultValue={"60"}
              ></TextField>
              <TextField
                label="Temperatura C°"
                id="outlined-size-small"
                defaultValue={"36.7"}
              ></TextField>
              <TextField
                label="F. Respiratoria/min"
                id="outlined-size-small"
                defaultValue={"15"}
              ></TextField>
              <TextField
                multiline
                label="Anotaciones"
                id="outlined-size-small"
                style={longText}
              ></TextField>
            </div>

            <div id="examinationStomatognathicSystem">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                5. Examen del Sistema Estomatognático
              </Typography>
              <FormControlLabel control={<Checkbox />} label="1. Labios" />
              <FormControlLabel control={<Checkbox />} label="2. Mejillas" />
              <FormControlLabel
                control={<Checkbox />}
                label="3. Maxilar Superior"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="4. Maxilar Inferior"
              />
              <FormControlLabel control={<Checkbox />} label="5. Lengua" />
              <FormControlLabel control={<Checkbox />} label="6. Paladar" />
              <FormControlLabel control={<Checkbox />} label="7. Piso" />
              <FormControlLabel control={<Checkbox />} label="8. Carrillos" />
              <FormControlLabel
                control={<Checkbox />}
                label="9. Glándulas Salivales"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="10. Oro Faringe"
              />
              <FormControlLabel control={<Checkbox />} label="11. A. T. M." />
              <FormControlLabel control={<Checkbox />} label="12. Ganglios" />

              <TextField
                multiline
                label="Anotaciones"
                style={longText}
                id="outlined-size-small"
              ></TextField>
            </div>

            <div id="odontogram">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                6. Odontograma
              </Typography>
            </div>

            <div id="oralHealthIndicators">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                7. Indicadores de Salud Bucal
              </Typography>
              <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={9}>
                      Higiene Oral Simplificada
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      Piezas Dentales
                    </TableCell>
                    <TableCell align="right">Placa 0-1-2-3-</TableCell>
                    <TableCell align="right">Cálculo 0-1-2-3</TableCell>
                    <TableCell lign="right">Gingitivitis 0-1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>16</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>17</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>55</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>11</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>21</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>51</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>26</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>27</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>65</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>36</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>37</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>75</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>31</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>41</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>71</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>46</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>47</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>85</TableCell>
                    <TableCell>
                      <FormControlLabel control={<Checkbox />} label="" />
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      Totales
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="2"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue="1"
                        size="small"
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        disabled
                        id="outlined-disabled"
                        defaultValue=""
                        size="small"
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableHead>
              </TableContainer>
              <br />
              <span>Enfermedad Periodontal: </span>
              <ButtonGroup
                buttons={["Leve", "Moderada", "Severa"]}
                doSomethingAfterClick={printButtonLabel}
              />
              <br />
              <br />
              <span>Mal Oclusión: </span>
              <ButtonGroup
                buttons={["Leve", "Moderada", "Severa"]}
                doSomethingAfterClick={printButtonLabel}
              />
              <br />
              <br />
              <span>Fluorosis: </span>
              <ButtonGroup
                buttons={["Leve", "Moderada", "Severa"]}
                doSomethingAfterClick={printButtonLabel}
              />
            </div>
            <br />
            <div id="cpoCboIndices">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                8. Índices CPO-<sub>CBO</sub>
              </Typography>

              <TableContainer component={Paper}>
                <TableRow>
                  <TableCell align="center" rowSpan={2}>
                    D
                  </TableCell>
                  <TableCell align="center">C</TableCell>
                  <TableCell align="center">P</TableCell>
                  <TableCell align="center">O</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">9</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">2</TableCell>
                  <TableCell align="center">11</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center" rowSpan={2}>
                    d
                  </TableCell>
                  <TableCell align="center">c</TableCell>
                  <TableCell align="center">e</TableCell>
                  <TableCell align="center">o</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">9</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">2</TableCell>
                  <TableCell align="center">11</TableCell>
                </TableRow>
              </TableContainer>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div id="planesDiagnostico">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                10. Planes de diagnóstico, terapéutico y educacional
              </Typography>
              <FormControlLabel control={<Checkbox />} label="Biometría" />
              <FormControlLabel
                control={<Checkbox />}
                label="Química sanguínea"
              />
              <FormControlLabel control={<Checkbox />} label="Rayos-x" />
              <FormControlLabel control={<Checkbox />} label="Otros" />
              <TextField
                multiline
                label="Anotaciones"
                style={longText}
                id="outlined-size-small"
              ></TextField>
            </div>

            <div id="diagnostico">
              <Typography variant="h6" fontWeight="bold" className="self-start">
                11. Diagnóstico
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="center">
                        PRE=PRESUNTIVO / DEF=DEFINITIVO
                      </TableCell>
                      <TableCell align="center">CIE</TableCell>
                      <TableCell align="right">PRE</TableCell>
                      <TableCell align="right">DEF</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {numeros.map((row, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
<<<<<<< HEAD
                      >
                        <TableCell component="th" scope="row">
                          {row}
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            multiline
                            style={longText}
                            id="outlined-size-small"
                          ></TextField>
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            multiline
                            style={longText}
                            id="outlined-size-small"
                          ></TextField>
                        </TableCell>
                        <TableCell align="right">
                          <input
                            type="checkbox"
                            value="check1"
                            checked={checkboxValue === "check1"}
                            onChange={handleCheck}
                            disabled={isDisabled}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <input
                            type="checkbox"
                            value="check2"
                            checked={checkboxValue === "check2"}
                            onChange={handleCheck}
                            disabled={isDisabled}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <br></br>
            <div id="datos">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody align="center">
                    <TableRow>
                      <TableCell className="border border-slate-300">
                        Fecha de apertura
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        <input type="date"></input>
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        Fecha de control
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        <input type="date"></input>
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        Profesional
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        <TextField defaultValue="Nicole Ávila"></TextField>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="border border-slate-300">
                        <TextField
                          label="Código"
                          id="outlined-size-small"
                        ></TextField>
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        Firma
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        <TextField defaultValue="Nicole Ávila"></TextField>
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        Número de hoja
                      </TableCell>
                      <TableCell
                        className="border border-slate-300"
                        align="right"
                      >
                        <input type="number"></input>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <br></br>
            <div id="tratamiento">
              <Stack direction="row" spacing={3}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  12. Tratamiento
                </Typography>
                <IconButton
                  aria-label="add"
                  onClick={() => {
                    setShowResults(true);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
              </Stack>
              <br></br>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">SESIÓN Y FECHA</TableCell>
                      <TableCell align="center">
                        DIAGNOSTICOS Y COMPLICACIONES
                      </TableCell>
                      <TableCell align="center">PROCEDIMIENTOS</TableCell>
                      <TableCell align="center">PRESCRIPCIONES</TableCell>
                      <TableCell align="center">CÓDIGO Y FIRMA</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tratamientos.map((row, index) => (
                      <TableRow
                        align="center"
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableRow>
                          <TableCell component="th" scope="row">
                            {row.sesion}
                          </TableCell>
                          <TableCell align="right">FECHA</TableCell>
                          <TableCell align="right">
                            {row.fecha.toDateString()}
                          </TableCell>
                        </TableRow>

                        <TableCell
                          label="diagnosticos"
                          id="outlined-size-small"
                        >
                          {row.diagnostico}
                        </TableCell>
                        <TableCell
                          label="procedimientos"
                          id="outlined-size-small"
                        >
                          {row.procedimiento}
                        </TableCell>
                        <TableCell
                          align="center"
                          label="prescripciones"
                          id="outlined-size-small"
                        >
                          {row.prescripciones}
                        </TableCell>
                        <TableRow>
                          <TableCell align="center">{row.codigo}</TableCell>
                          <TableCell align="right">{row.firma}</TableCell>
                        </TableRow>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <div>{showResults ? <Results /> : null}</div>
            </div>
          </TabPanel>
        </Box>
      </FormControl>
    </div>
  );
};

export default PatientInfo;
=======
                        noValidate
                        autoComplete="off"
                    ></Box>
                    <br />

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="self-start"
                    >
                        Información general
                    </Typography>
                    <br />
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-x-5">
                            <TextField id="outlined-basic" label="N. Historia Clínica" defaultValue="1"></TextField>
                        </div>
                        <div className="flex flex-row gap-x-5">
                            <TextField className="" id="outlined-basic" label="Nombres" defaultValue="Eduardo Emilio"></TextField>
                            <TextField className="" id="outlined-basic" label="Apellidos" defaultValue="Salavarría Gómez"></TextField>
                            <TextField className="" id="outlined-basic" label="Cédula" defaultValue="0930939145"></TextField>
                        </div>

                        <div className="flex  flex-row gap-x-5">
                            <TextField id="outlined-basic" label="Sexo" defaultValue="Masculino"></TextField>
                            <TextField className="" id="outlined-basic" label="Edad" defaultValue="20"></TextField>
                        </div>

                        <div className="flex gap-x-5">
                            <TextField id="outlined-basic" label="Celular" defaultValue="0990625269"></TextField>
                        </div>

                        <div className="pt-5">
                            
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{fontSize: 20}}>Rango de Edad</FormLabel>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Menor de 1 año" />
                                <FormControlLabel value="2" control={<Radio />} label="1-4 años" />
                                <FormControlLabel value="3" control={<Radio />} label="5-9 años programado" />
                                <FormControlLabel value="4" control={<Radio />} label="5-14 años programado" />
                                <FormControlLabel value="5" control={<Radio />} label="10-14  años programado" />
                                <FormControlLabel value="6" control={<Radio />} label="Mayor de 20 años" />

                            </RadioGroup>
                            
                        </div>

                        <div className="pb-4">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                Estado de gestación
                            </Typography>

                            <FormControlLabel control={<Checkbox />} label="Embarazada" />
                        </div>
                    </div>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Frontal" {...a11yProps(0)} sx={{fontSize: 20}}/>
                            <Tab label="Posterior" {...a11yProps(1)} sx={{fontSize: 20}}/>
                        </Tabs>
                    </Box>

                    <TabPanel sx={{color: 'red'}} value={value} index={0}>
                        <div className="flex flex-col gap-8">
                            <div id="appointmentReason">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    1. Motivo de consulta
                                </Typography>
                                <TextField hiddenLabel multiline style={longText}
                                    id='outlined-size-small' defaultValue={"Vengo a hacerme una limpieza"}></TextField>
                            </div>
                            <div id="currentDiseaseOrProblem">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    2. Enfermedad o Problema actual
                                </Typography>
                                <TextField hiddenLabel multiline style={longText}
                                    id='outlined-size-small' defaultValue={"Asintomático"}></TextField>
                            </div>
                            <div id="familyHistory">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    3. Antecedentes Familiares
                                </Typography>

                                <div className='grid grid-cols-4'>
                                    <FormControlLabel control={<Checkbox />} label="Alergia Antiobiótico" />
                                    <FormControlLabel control={<Checkbox />} label="Alergia Anestesia" />
                                    <FormControlLabel control={<Checkbox />} label="Hemorragias" />
                                    <FormControlLabel control={<Checkbox />} label="VIH Sida" />
                                    <FormControlLabel control={<Checkbox />} label="Tuberculosis" />
                                    <FormControlLabel control={<Checkbox />} label="Asma" />
                                    <FormControlLabel control={<Checkbox />} label="Diabetes" />
                                    <FormControlLabel control={<Checkbox />} label="Hipertensión" />
                                    <FormControlLabel control={<Checkbox />} label="Enf. Cardiaca" />
                                    <FormControlLabel control={<Checkbox />} label="Alergia Antiobiótico" />
                                    <FormControlLabel control={<Checkbox />} label="Otro" />
                                </div>

                                <br/>

                                <TextField
                                    hiddenLabel multiline style={longText}
                                    id='outlined-size-small'
                                    defaultValue={"No refiere antecedentes personales"}
                                >
                                </TextField>
                            </div>
                            <div id="vitalSigns">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    4. Signos Vitales
                                </Typography>
                                <br/>
                                <div className="flex flex-row gap-5 ">
                                    <TextField label="Presión Arterial" id='outlined-size-small' defaultValue={"144/70"}></TextField>
                                    <TextField label="Frecuencia Cardiaca" id='outlined-size-small' defaultValue={"60"}></TextField>
                                    <TextField label="Temperatura C°" id='outlined-size-small' defaultValue={"36.7"}></TextField>
                                    <TextField label="F. Respiratoria/min" id='outlined-size-small' defaultValue={"15"}></TextField>
                                </div>

                                <br/>
                                <TextField multiline label="Anotaciones" id='outlined-size-small' style={longText}></TextField>
                            </div>
                            <div id="examinationStomatognathicSystem">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    5. Examen del Sistema Estomatognático
                                </Typography>
                                <div className="grid grid-cols-4">
                                    <FormControlLabel control={<Checkbox />} label="1. Labios" />
                                    <FormControlLabel control={<Checkbox />} label="2. Mejillas" />
                                    <FormControlLabel control={<Checkbox />} label="3. Maxilar Superior" />
                                    <FormControlLabel control={<Checkbox />} label="4. Maxilar Inferior" />
                                    <FormControlLabel control={<Checkbox />} label="5. Lengua" />
                                    <FormControlLabel control={<Checkbox />} label="6. Paladar" />
                                    <FormControlLabel control={<Checkbox />} label="7. Piso" />
                                    <FormControlLabel control={<Checkbox />} label="8. Carrillos" />
                                    <FormControlLabel control={<Checkbox />} label="9. Glándulas Salivales" />
                                    <FormControlLabel control={<Checkbox />} label="10. Oro Faringe" />
                                    <FormControlLabel control={<Checkbox />} label="11. A. T. M." />
                                    <FormControlLabel control={<Checkbox />} label="12. Ganglios" />
                                </div>
                                <TextField
                                    multiline label="Anotaciones"
                                    style={longText}
                                    id='outlined-size-small'
                                ></TextField>
                            </div>
                            <div id="odontogram">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    6. Odontograma
                                </Typography>
                            </div>
                            <div id="oralHealthIndicators">
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    7. Indicadores de Salud Bucal
                                </Typography>
                                <TableContainer component={Paper} sx={{ maxWidth: "100%" }} >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={9}>
                                                Higiene Oral Simplificada
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center' colSpan={6}>Piezas Dentales</TableCell>
                                            <TableCell align="right">Placa 0-1-2-3-4</TableCell>
                                            <TableCell align="right">Cálculo 0-1-2-3</TableCell>
                                            <TableCell lign="right">Gingitivitis 0-1</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>16</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>17</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>55</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>11</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>21</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>51</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>26</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>27</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>65</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>36</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>37</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>75</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>31</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>41</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>71</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>46</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>47</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell>85</TableCell>
                                            <TableCell><FormControlLabel control={<Checkbox />} label="" /></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center' colSpan={6}>Totales</TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="2" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="1" size='small'></TextField></TableCell>
                                            <TableCell><TextField disabled id="outlined-disabled" defaultValue="" size='small'></TextField></TableCell>
                                        </TableRow>
                                    </TableHead>
                                </TableContainer>
                                <br />
                                <span>Enfermedad Periodontal: </span>
                                <ButtonGroup
                                    buttons={["Leve", "Moderada", "Severa"]}
                                    doSomethingAfterClick={printButtonLabel}
                                />
                                <br />
                                <br />
                                <span>Mal Oclusión: </span>
                                <ButtonGroup
                                    buttons={["Leve", "Moderada", "Severa"]}
                                    doSomethingAfterClick={printButtonLabel}
                                />
                                <br />
                                <br />
                                <span>Fluorosis: </span>
                                <ButtonGroup
                                    buttons={["Leve", "Moderada", "Severa"]}
                                    doSomethingAfterClick={printButtonLabel}
                                />
                            </div>

                            <div id="cpoCboIndices">
                                <Typography
                                    variant="h6" 
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    8. Índices CPO-<sub>CBO</sub>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <TableRow>
                                        <TableCell align='center' rowSpan={2}>D</TableCell>
                                        <TableCell align='center'>C</TableCell>
                                        <TableCell align='center'>P</TableCell>
                                        <TableCell align='center'>O</TableCell>
                                        <TableCell align='center'>Total</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>9</TableCell>
                                        <TableCell align='center'>0</TableCell>
                                        <TableCell align='center'>2</TableCell>
                                        <TableCell align='center'>11</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center' rowSpan={2}>d</TableCell>
                                        <TableCell align='center'>c</TableCell>
                                        <TableCell align='center'>e</TableCell>
                                        <TableCell align='center'>o</TableCell>
                                        <TableCell align='center'>Total</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>9</TableCell>
                                        <TableCell align='center'>0</TableCell>
                                        <TableCell align='center'>2</TableCell>
                                        <TableCell align='center'>11</TableCell>
                                    </TableRow>
                                </TableContainer>
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div id="planesDiagnostico">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                10. Planes de diagnóstico, terapéutico y educacional
                            </Typography>
                            <FormControlLabel control={<Checkbox />} label="Biometría" />
                            <FormControlLabel control={<Checkbox />} label="Química sanguínea" />
                            <FormControlLabel control={<Checkbox />} label="Rayos-x" />
                            <FormControlLabel control={<Checkbox />} label="Otros" />
                            <TextField multiline label="Anotaciones" style={longText}
                                id='outlined-size-small' ></TextField>
                        </div>

                        <div id="diagnostico">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                11. Diagnóstico
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell align="center">PRE=PRESUNTIVO / DEF=DEFINITIVO</TableCell>
                                            <TableCell align="center">CIE</TableCell>
                                            <TableCell align="right">PRE</TableCell>
                                            <TableCell align="right">DEF</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{
                                        numeros.map((row, i) =>
                                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">{row}</TableCell>
                                                <TableCell align="right"><TextField multiline style={longText}
                                                    id='outlined-size-small' ></TextField></TableCell>
                                                <TableCell align="right"><TextField multiline style={longText}
                                                    id='outlined-size-small' ></TextField></TableCell>
                                                <TableCell align="right">
                                                    <input
                                                        type="checkbox"
                                                        value="check1"
                                                        checked={checkboxValue === "check1"}
                                                        onChange={handleCheck}
                                                        disabled={isDisabled}
                                                    />
                                                </TableCell>
                                                <TableCell align="right">
                                                    <input
                                                        type="checkbox"
                                                        value="check2"
                                                        checked={checkboxValue === "check2"}
                                                        onChange={handleCheck}
                                                        disabled={isDisabled}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <div id="datos">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody align="center">
                                        <TableRow>
                                            <TableCell className="border border-slate-300">Fecha de apertura</TableCell>
                                            <TableCell className="border border-slate-300" align="right"><input type="date"></input></TableCell>
                                            <TableCell className="border border-slate-300" align="right">Fecha de control</TableCell>
                                            <TableCell className="border border-slate-300" align="right"><input type="date"></input></TableCell>
                                            <TableCell className="border border-slate-300" align="right">Profesional</TableCell>
                                            <TableCell className="border border-slate-300" align="right"><TextField defaultValue="Nicole Ávila"></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="border border-slate-300"><TextField label="Código" id='outlined-size-small' ></TextField></TableCell>
                                            <TableCell className="border border-slate-300" align="right">Firma</TableCell>
                                            <TableCell className="border border-slate-300" align="right"><TextField defaultValue="Nicole Ávila"></TextField></TableCell>
                                            <TableCell className="border border-slate-300" align="right">Número de hoja</TableCell>
                                            <TableCell className="border border-slate-300" align="right"><input type="number"></input></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <div id="tratamiento">

                            <Stack direction="row" spacing={3}>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    className="self-start"
                                >
                                    12. Tratamiento
                                </Typography>
                                <IconButton aria-label="add" onClick={() => { setShowResults(true); }}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Stack>
                            <br></br>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">SESIÓN Y FECHA</TableCell>
                                            <TableCell align="center">DIAGNOSTICOS Y COMPLICACIONES</TableCell>
                                            <TableCell align="center">PROCEDIMIENTOS</TableCell>
                                            <TableCell align="center">PRESCRIPCIONES</TableCell>
                                            <TableCell align="center">CÓDIGO Y FIRMA</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>{
                                        tratamientos.map((row, index) =>
                                            <TableRow align="center" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">{row.sesion}</TableCell>
                                                    <TableCell align="right">FECHA</TableCell>
                                                    <TableCell align="right">{row.fecha.toDateString()}</TableCell>
                                                </TableRow>

                                                <TableCell label="diagnosticos" id='outlined-size-small'>{row.diagnostico}</TableCell>
                                                <TableCell label="procedimientos" id='outlined-size-small'>{row.procedimiento}</TableCell>
                                                <TableCell align="center" label="prescripciones" id='outlined-size-small'>{row.prescripciones}</TableCell>
                                                <TableRow>
                                                    <TableCell align="center">{row.codigo}</TableCell>
                                                    <TableCell align="right">{row.firma}</TableCell>
                                                </TableRow>
                                            </TableRow>
                                        )
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>{showResults ? <Results /> : null}</div>
                        </div>
                    </TabPanel>
                </Box>
            </FormControl>
        </div>
    );
}

export default PatientInfo;
>>>>>>> 9adfe87 (WIP)
