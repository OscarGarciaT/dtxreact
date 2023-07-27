import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import usePatients from "../utils/hooks/usePatients";
import { useForm } from "react-hook-form";
import useDebounceEffect from "../utils/hooks/useDebounceEffect";
import { TextField, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import Button from '@mui/material/Button';

import DtxTextField from "../Components/Form/DtxTextField";
import DtxSelect from "../Components/Form/DtxSelect";


const AppointmentInfo = ({ ...props }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const patients = usePatients(searchQuery);
    const [selectedPatient, setSelectedPatient] = useState("");
    const { control, watch, reset } = useForm({
        mode: "onChange",
        defaultValues: selectedPatient
    });
    const search = watch("search");

    const handlePatienteChange = (event, value) => {
        setSelectedPatient(value);
    }

    useEffect(() => {
        if (selectedPatient) {
            reset(selectedPatient);
        }
    }, [selectedPatient, reset]);

    console.log(patients)

    useDebounceEffect(
        () => {
            setSearchQuery(search);
        },
        350,
        [search]
    );



    const mode = props?.mode;
    const appointmentData = props?.appointmentData
    const isEditMode = mode === "EDIT";


    return (<div className="appointment-container p-10">



        <div className="flex flex-col gap-5">
            <Autocomplete
                options={patients}
                key={option => option["_id"]}

                renderOption={(props, option) => {
                    return (
                        <li {...props} key={option["_id"]}>
                            {option.nombres} {option.apellidos} - {option.cedula}
                        </li>
                    );
                }}
                getOptionLabel={option => `${option.nombres} ${option.apellidos} - ${option.cedula}`}
                onChange={handlePatienteChange}
                renderInput={(params) => <TextField {...params} label="Seleccione un paciente..." />}
            />
            <Typography variant="h6" fontWeight="bold" className="self-start">
                Información paciente
            </Typography>
            <div className="flex flex-row gap-x-5">

                <DtxTextField
                    viewMode={true}
                    control={control}
                    name={"info_general.nombres"}
                    pattern={/^[A-Za-z ]+$/g}
                    patternMessage={"Solo se aceptan letras y espacios"}
                    label="Nombres"
                />
                <DtxTextField
                    viewMode={true}
                    control={control}
                    name={"info_general.apellidos"}
                    pattern={/^[A-Za-z ]+$/g}
                    patternMessage={"Solo se aceptan letras y espacios"}
                    label="Apellidos"
                />
                <DtxTextField
                    viewMode={true}
                    control={control}
                    name={"info_general.cedula"}
                    pattern={/^\d{10}$/g}
                    patternMessage={"# Cedula invalido"}
                    label="Cédula"
                />
            </div>

            <div className="flex  flex-row gap-x-5">
                <DtxSelect
                    viewMode={true}
                    control={control}
                    name={"info_general.sexo"}
                    label="Sexo"
                    options={[
                        { label: "Masculino", value: "masculino" },
                        { label: "Femenino", value: "femenino" },
                        { label: "Otro", value: "otro" },
                    ]}

                />

                <DtxTextField
                    viewMode={true}
                    control={control}
                    name={"info_general.edad"}
                    label="Edad"
                    pattern={/^(?:1[0-4]\d|[0-9]{1,2})$|^150$/g}
                    patternMessage={"Edades válidas: 0-150 años."}

                />
            </div>

            <div className="flex gap-x-5">
                <DtxTextField
                    viewMode={true}
                    control={control}
                    name={"info_general.celular"}
                    label="Celular"
                    pattern={/^\d{10}$/g}
                    patternMessage={"# Celular invalido"}
                />
            </div>
            <Typography variant="h6" fontWeight="bold" className="self-start">
                Horario
            </Typography>
            <div className="appointment-date-container flex flex-col gap-5">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    Seleccionar día
                    <DatePicker />
                    Seleccionar Hora Inicio
                    <TimeField defaultValue={dayjs('2022-04-17T15:30')} />
                    Seleccionar Hora Fin
                    <TimeField defaultValue={dayjs('2022-04-17T15:30')} />
                </LocalizationProvider>
            </div>
            <div className="appointment-footer flex flex-col gap-5">
                Agregar Nota
                <TextField
                    id="outlined-multiline-flexible"
                    label="Nota"
                    multiline
                    maxRows={4}
                />
                <Button variant="contained">Guardar</Button>
            </div>
        </div>


    </div>)
}

export default AppointmentInfo;