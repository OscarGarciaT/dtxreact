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
                    <TextField disabled id="outlined-disabled" label="Cédula" defaultValue="0930939145"></TextField>
                    <TextField disabled id="outlined-disabled" label="Nombres" defaultValue="Eduardo Emilio"></TextField>
                    <TextField disabled id="outlined-disabled" label="Apellidos" defaultValue="Salavarría Gómez"></TextField>
                    <TextField disabled id="outlined-disabled" label="Celular" defaultValue="0990625269"></TextField>
                    <br />
                    <br />
                    <TextField disabled id="outlined-disabled" label="Sexo" defaultValue="Masculino"></TextField>
                    <TextField disabled id="outlined-disabled" label="Edad" defaultValue="21"></TextField>
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
                            <TextField label="Presión Arterial" id='outlined-size-small' defaultValue={"144/70"}></TextField>
                            <TextField label="Frecuencia Cardiaca" id='outlined-size-small' defaultValue={"60"}></TextField>
                            <TextField label="Temperatura C°" id='outlined-size-small' defaultValue={"36.7"}></TextField>
                            <TextField label="F. Respiratoria/min" id='outlined-size-small' defaultValue={"15"}></TextField>

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
                        Ficha tratamientos
                    </TabPanel>
                </Box>
            </FormControl>
        </div>
    );
}

export default PatientInfo;