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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (

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

            <FormControl>
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
            </FormControl>
            <br />
            <br />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Frontal" {...a11yProps(0)} />
                    <Tab label="Posterior" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Ficha Paciente
            </TabPanel>
            <TabPanel value={value} index={1}>
                Ficha tratamientos
            </TabPanel>
        </Box>
    );
}

export default PatientInfo;