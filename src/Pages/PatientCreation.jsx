import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input'
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
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';

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



const PatientCreation = () => {
    const longText = {
        width: "100%"
    };
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [isDisabled, setIsDisabled] = React.useState(false);
    const [checkboxValue, setCheckboxValue] = React.useState();
    const handleCheck = e => {
        setCheckboxValue(e.target.value);
        //setIsDisabled(true);
      };

    const numeros = [1,2,3,4];

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
                    <h1>Información General</h1>
                    <br />
                    <TextField  id="outlined-disabled" label="Cédula" ></TextField>
                    <TextField  id="outlined-disabled" label="Nombres" ></TextField>
                    <TextField  id="outlined-disabled" label="Apellidos" ></TextField>
                    <TextField  id="outlined-disabled" label="Celular"></TextField>
                    <br />
                    <br />
                    <TextField id="outlined-disabled" label="Sexo" ></TextField>
                    <TextField  id="outlined-disabled" label="Edad"></TextField>
                    <br />
                    <br />
                    <FormLabel id="demo-row-radio-buttons-group-label">Rango de Edad</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Menor a 18" />
                        <FormControlLabel value="male" control={<Radio />} label="Entre 18 a 65" />
                        <FormControlLabel value="other" control={<Radio />} label="Mayor a 65" />
                    </RadioGroup>
                    <br />


                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Frontal" {...a11yProps(0)} />
                            <Tab label="Posterior" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div id="appointmentReason">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                1. Motivo de consulta
                            </Typography>
                            <TextField hiddenLabel multiline style={longText}
                                id='outlined-size-small' ></TextField>
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
                                id='outlined-size-small'></TextField>
                        </div>

                        <div id="familyHistory">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                3. Antecedentes Familiares
                            </Typography>
                            <FormControlLabel control={<Checkbox  />} label="Alergia Antiobiótico" />
                            <FormControlLabel control={<Checkbox  />} label="Alergia Anestesia" />
                            <FormControlLabel control={<Checkbox  />} label="Hemorragias" />
                            <FormControlLabel control={<Checkbox  />} label="VIH Sida" />
                            <FormControlLabel control={<Checkbox  />} label="Tuberculosis" />
                            <FormControlLabel control={<Checkbox  />} label="Asma" />
                            <FormControlLabel control={<Checkbox  />} label="Diabetes" />
                            <FormControlLabel control={<Checkbox  />} label="Hipertensión" />
                            <FormControlLabel control={<Checkbox  />} label="Enf. Cardiaca" />
                            <FormControlLabel control={<Checkbox  />} label="Alergia Antiobiótico" />
                            <FormControlLabel control={<Checkbox  />} label="Otro" />

                            <TextField hiddenLabel multiline style={longText}
                                id='outlined-size-small' defaultValue={"No refiere antecedentes personales"}></TextField>
                        </div>

                        <div id="vitalSigns">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                4. Signos Vitales
                            </Typography>
                            <TextField label="Presión Arterial" id='outlined-size-small' ></TextField>
                            <TextField label="Frecuencia Cardiaca" id='outlined-size-small' ></TextField>
                            <TextField label="Temperatura C°" id='outlined-size-small'></TextField>
                            <TextField label="F. Respiratoria/min" id='outlined-size-small'></TextField>

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
                            <FormControlLabel control={<Checkbox  />} label="1. Labios" />
                            <FormControlLabel control={<Checkbox  />} label="2. Mejillas" />
                            <FormControlLabel control={<Checkbox  />} label="3. Maxilar Superior" />
                            <FormControlLabel control={<Checkbox  />} label="4. Maxilar Inferior" />
                            <FormControlLabel control={<Checkbox  />} label="5. Lengua" />
                            <FormControlLabel control={<Checkbox  />} label="6. Paladar" />
                            <FormControlLabel control={<Checkbox  />} label="7. Piso" />
                            <FormControlLabel control={<Checkbox  />} label="8. Carrillos" />
                            <FormControlLabel control={<Checkbox  />} label="9. Glándulas Salivales" />
                            <FormControlLabel control={<Checkbox  />} label="10. Oro Faringe" />
                            <FormControlLabel control={<Checkbox  />} label="11. A. T. M." />
                            <FormControlLabel control={<Checkbox  />} label="12. Ganglios" />

                            <TextField multiline label="Anotaciones" style={longText} id='outlined-size-small'></TextField>
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
                        </div>

                        <div id="cpoCboIndices">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                8. Índices CPO-<sub>CBO</sub>
                            </Typography>
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
                            <FormControlLabel control={<Checkbox  />} label="Biometría" />
                            <FormControlLabel control={<Checkbox  />} label="Química sanguínea" />
                            <FormControlLabel control={<Checkbox  />} label="Rayos-x" />
                            <FormControlLabel control={<Checkbox  />} label="Otros" />
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
                                            numeros.map(row=>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                <Table  sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableBody align="center">
                                        <TableRow>
                                            <TableCell class="border border-slate-300">Fecha de apertura</TableCell>
                                            <TableCell class="border border-slate-300" align="right"><input type="date"></input></TableCell>
                                            <TableCell class="border border-slate-300" align="right">Fecha de control</TableCell>
                                            <TableCell class="border border-slate-300" align="right"><input type="date"></input></TableCell>
                                            <TableCell class="border border-slate-300" align="right">Profesional</TableCell>
                                            <TableCell class="border border-slate-300" align="right"><TextField defaultValue="Nicole Ávila"></TextField></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell class="border border-slate-300"><TextField label="Código" id='outlined-size-small' ></TextField></TableCell>
                                            <TableCell class="border border-slate-300" align="right">Firma</TableCell>
                                            <TableCell class="border border-slate-300" align="right"><TextField defaultValue="Nicole Ávila"></TextField></TableCell>
                                            <TableCell class="border border-slate-300" align="right">Número de hoja</TableCell>
                                            <TableCell class="border border-slate-300" align="right"><input type="number" class="border border-slate-300"></input></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                        <br></br>
                        <div id="tratamiento">
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                className="self-start"
                            >
                                12. Tratamiento
                            </Typography>
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
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableRow>
                                                <TableCell component="th" scope="row"><TextField multiline label="Sesion" id='outlined-size-small' ></TextField></TableCell>
                                                <TableCell align="right">FECHA</TableCell>
                                                <TableCell align="right"><input type="date"></input></TableCell>
                                            </TableRow>
                                                                                    
                                            <TableCell align="right" label="diagnosticos" id='outlined-size-small'><TextField multiline style={longText} id='outlined-size-small' ></TextField></TableCell>
                                            <TableCell align="right" label="procedimientos" id='outlined-size-small'><TextField multiline style={longText} id='outlined-size-small' ></TextField></TableCell>
                                            <TableCell align="right" label="prescripciones" id='outlined-size-small'><TextField multiline style={longText} id='outlined-size-small' ></TextField></TableCell>
                                            <TableRow>
                                                <TableCell class="border border-slate-300"><TextField label="Código" id='outlined-size-small' ></TextField></TableCell>
                                                <TableCell class="border border-slate-300" align="right"><TextField label="Firma" defaultValue="Nicole Ávila"></TextField></TableCell>
                                            </TableRow>
                                        </TableRow>
                                        <Button variant="contained" endIcon={<SendIcon />}>
                                            Guardar registro
                                        </Button>
                                </Table>
                            </TableContainer>
                        </div>
                    </TabPanel>
                </Box>
            </FormControl>
        </div>
    );
}

export default PatientCreation;