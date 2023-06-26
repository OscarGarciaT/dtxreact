import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '../Components/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SOralHigiene from "../Components/Table/SimplifiedOralHigene";
import CpoIndices from '../Components/Table/CpoIndices';

const CustomTextField = ({ control, name, required, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={""}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          required={required}
          error={invalid}
          helperText={error?.message}
          inputRef={field.ref}
          {...field}
          {...props}
        />
      )}
    />
  );
};


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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PatientInfo = () => {

  const longText = {
    width: "100%"
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const printButtonLabel = (event) => {
    console.log(event.target.name);
  };

  const [isDisabled, setIsDisabled] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState();
  const numeros = [1, 2, 3, 4];

  const tratamientos = [{
    session: 1,
    date: (new Date('Jul 12 2021')).toString(),
    diag: "K036",
    proced: "D1110, D4910",
    pres: "",
    code: "",
    sign: "Nicole Ávila"
  }, {
    session: 2,
    date: (new Date('Jul 12 2021')).toString(),
    diag: "K021 pieza#11",
    proced: "D2331",
    pres: "",
    code: "",
    sign: "Nicole Ávila"
  }, {
    session: 3,
    date: (new Date('Jul 12 2021')).toString(),
    diag: "K036",
    proced: "D1110, D4910",
    pres: "",
    code: "",
    sign: "Nicole Ávila"
  }];

  const [session, setSession] = useState('');
  const [date, setDate] = useState('');
  const [diag, setDiag] = useState('');
  const [proced, setProced] = useState('');
  const [pres, setPres] = useState('');
  const [code, setCode] = useState('');
  const [sign, setSign] = useState('');
  const [rTratamientos, setRTratamientos] = useState(tratamientos)

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
    console.log('Tratamiento:', tratamiento);
    const newTratamientos = [...rTratamientos, tratamiento];
    setRTratamientos(newTratamientos);
    console.log(newTratamientos);
  };





  const [showResults, setShowResults] = React.useState(false);

  const { control, watch } = useForm();


  return (
    <div className='ml-3'>
      <FormControl>
        <Box sx={{ width: '100%' }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 2, width: '25ch' },
            }}
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
              <TextField id="outlined-basic" label="N. Historia Clínica *" />
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

              <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 20 }}>Rango de Edad</FormLabel>

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
              <Tab label="Frontal" {...a11yProps(0)} sx={{ fontSize: 20 }} />
              <Tab label="Posterior" {...a11yProps(1)} sx={{ fontSize: 20 }} />
            </Tabs>
          </Box>

          <TabPanel sx={{ color: 'red' }} value={value} index={0}>
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
                  defaultValue={"Vengo a hacerme una limpieza"}></TextField>
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
                  defaultValue={"Asintomático"}></TextField>
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

                <br />

                <TextField
                  hiddenLabel multiline style={longText}

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
                <br />
                <div className="flex flex-row gap-5 ">
                  <TextField label="Presión Arterial" defaultValue={"144/70"}></TextField>
                  <TextField label="Frecuencia Cardiaca" defaultValue={"60"}></TextField>
                  <TextField label="Temperatura C°" defaultValue={"36.7"}></TextField>
                  <TextField label="F. Respiratoria/min" defaultValue={"15"}></TextField>
                </div>

                <br />
                <TextField multiline label="Anotaciones" style={longText}></TextField>
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
              <Typography
                variant="h6"
                fontWeight="bold"
                className="self-start"
              >
                7. Indicadores de Salud Bucal
              </Typography>
              <div id="oralHealthIndicators" className="flex flex-row gap-4" >
                <SOralHigiene control={control} watch={watch} />
                <div className='flex flex-col justify-center'>
                  <span>Enfermedad Periodontal: </span>
                  <ButtonGroup
                    buttons={["Leve", "Moderada", "Severa"]}
                    doSomethingAfterClick={printButtonLabel}
                  />
                  <br />
                  <br />
                  <span>Mal Oclusión: </span>
                  <ButtonGroup
                    buttons={["Angle I", "Angle II", "Angle III"]}
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
              </div>

              <div id="cpoCboIndices" >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  8. Índices CPO-<sub>CBO</sub>
                </Typography>
                <CpoIndices control={control} watch={watch} />
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
              ></TextField>
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
                      <TableCell align="center">PRE/DEF</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>{
                    numeros.map((row, i) =>
                      <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row}</TableCell>
                        <TableCell align="right"><TextField style={longText} /></TableCell>
                        <TableCell align="right"><TextField style={longText} /></TableCell>
                        <TableCell className='flex flex-col items-center justify-center'>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="1" control={<Radio />} label="Pre" />
                            <FormControlLabel value="2" control={<Radio />} label="Def" />
                          </RadioGroup>
                        </TableCell>
                      </TableRow>
                    )
                  }
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <br></br>
            <div id="datosOdontólogo">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody align="center">
                    <TableRow>
                      <TableCell>Fecha de apertura</TableCell>
                      <TableCell >Fecha de control</TableCell>
                      <TableCell >Profesional</TableCell>
                      <TableCell >Código</TableCell>
                      <TableCell >Firma</TableCell>
                      <TableCell >Número de hoja</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell ><input type="date" className='h-10' /></TableCell>
                      <TableCell ><input type="date" className='h-10' /></TableCell>
                      <TableCell ><TextField></TextField></TableCell>
                      <TableCell ><TextField label="Código" ></TextField></TableCell>
                      <TableCell ><TextField defaultValue="Nicole Ávila"  ></TextField></TableCell>
                      <TableCell ><input type="number" className='h-10' /></TableCell>
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
              </Stack>
              <br></br>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody><div>
                    <TableRow>
                      <TableCell align="center">SESIÓN</TableCell>
                      <TableCell align="center">FECHA</TableCell>
                      <TableCell align="center">DIAGNOSTICOS Y COMPLICACIONES</TableCell>
                      <TableCell align="center">PROCEDIMIENTOS</TableCell>
                      <TableCell align="center">PRESCRIPCIONES</TableCell>
                      <TableCell align="center">CÓDIGO </TableCell>
                      <TableCell align="center">FIRMA </TableCell>
                    </TableRow>
                    {rTratamientos.map((row, index) => (
                      < TableRow align="center" key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.session}</TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell>{row.diag}</TableCell>
                        <TableCell>{row.proced}</TableCell>
                        <TableCell align="center">{row.pres}</TableCell>
                        <TableCell align="center">{row.code}</TableCell>
                        <TableCell align="right">{row.sign}</TableCell>
                      </TableRow>
                    ))}
                  </div>
                  </TableBody>
                </Table>
              </TableContainer>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableRow className='flex flex-row items-center justify-center'>
                      <TableCell component="th" scope="row">
                        <TextField multiline label="Sesion" value={session} onChange={(event) => setSession(event.target.value)} />
                      </TableCell>
                      <TableCell align="right">
                        <input type="date" className='h-10' value={date} onChange={(event) => setDate(event.target.value ? event.target.value : new Date())} />
                      </TableCell>
                      <TableCell align="right" label="diagnosticos">
                        <TextField multiline style={longText} value={diag} onChange={(event) => setDiag(event.target.value)} />
                      </TableCell>
                      <TableCell align="right" label="procedimientos">
                        <TextField multiline style={longText} value={proced} onChange={(event) => setProced(event.target.value)} />
                      </TableCell>
                      <TableCell align="right" label="prescripciones">
                        <TextField multiline style={longText} value={pres} onChange={(event) => setPres(event.target.value)} />
                      </TableCell>
                      <TableCell>
                        <TextField label="Código" value={code} onChange={(event) => setCode(event.target.value)} />
                      </TableCell>
                      <TableCell align="right">
                        <TextField label="Firma" defaultValue="Nicole Ávila" value={sign} onChange={(event) => setSign(event.target.value)} />
                      </TableCell>
                      <Button variant="contained" onClick={addTreatmentRow}>
                        <SendIcon />
                      </Button>
                    </TableRow>
                  </Table>
                </TableContainer>

              </div>
            </div>
          </TabPanel>
        </Box>
      </FormControl>
    </div >
  );
}

export default PatientInfo;