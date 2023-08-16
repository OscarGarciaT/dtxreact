import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import usePatients from "../utils/hooks/usePatients";
import { useForm, Controller } from "react-hook-form";
import useDebounceEffect from "../utils/hooks/useDebounceEffect";
import { TextField, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { useDispatch, useSelector } from "react-redux";
import { popDialog } from "../slices/dialogSlice";

import { incrementDataRevision } from "../slices/revisionSlice";
//services
import { createAppointment, updateAppointment } from "../services/appointmentServices";

//local
import DtxTextField from "../Components/Form/DtxTextField";
import DtxSelect from "../Components/Form/DtxSelect";
import DtxCheckbox from "../Components/Form/DtxCheckbox";


const AppointmentInfo = ({ ...props }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const patients = usePatients(searchQuery);
    const [selectedPatient, setSelectedPatient] = useState("");
    const dispatch = useDispatch();
    const mode = props?.mode;
    const isEditMode = mode === "EDIT";
    const appointmentData = props?.appointmentData
    const appointmentId = appointmentData?._id;
    const doctorId = useSelector(({ user }) => user.doctorId)
    const [patient, setPatient] = useState(null);

    console.log(appointmentData)
    const { control, watch, reset, handleSubmit, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            ...(isEditMode ? {
                patient: patient,
                nota: appointmentData.motivo,
                fecha_cita: dayjs(appointmentData.fecha_cita),
                hora_inicio_cita: dayjs(appointmentData.hora_inicio_cita),
                hora_fin_cita: dayjs(appointmentData.hora_fin_cita),
                nombres: patient?.nombres,
                apellidos: patient?.apellidos,
                cedula: patient?.cedula,
                sexo: patient?.sexo,
                edad: patient?.edad,
                asistencia: appointmentData?.asistencia,
            } : {
                fecha_cita: dayjs(),
                hora_inicio_cita: dayjs('2022-04-17T15:30'),
                hora_fin_cita: dayjs('2022-04-17T16:00'),
            }
            ),
            //nota: appointmentData.motivo
        },
    })
    useEffect(() => {
        if (appointmentData && patients.length) {
            let paciente = patients.filter((pat) => pat._id === appointmentData.paciente_id)[0]
            setPatient(paciente)
            setValue("patient", paciente)
            setValue("nombres", paciente?.nombres)
            setValue("apellidos", paciente?.apellidos)
            setValue("cedula", paciente?.cedula)
            setValue("sexo", paciente?.sexo)
            setValue("edad", paciente?.edad)
            setValue("celular", paciente?.celular)
            setValue("fecha_cita", dayjs(appointmentData.fecha_cita))
            setValue("asistencia", appointmentData?.asistencia)
        }
    }, [patients])

    useEffect(() => { console.log("paciente: ", { patient }) }, [patient])

    const search = watch("search");

    const handlePatienteChange = (event, value) => {
        setSelectedPatient(value);
    }

    useEffect(() => {
        if (selectedPatient) {
            reset(selectedPatient);
        }
    }, [selectedPatient, reset]);


    useDebounceEffect(
        () => {
            setSearchQuery(search);
        },
        350,
        [search]
    );

    // Función para manejar el envío del formulario
    const onSubmit = async (data) => {

        let appointmentDataToSend = {
            paciente_id: data["_id"],
            fecha_cita: data["fecha_cita"],
            hora_inicio_cita: data["hora_inicio_cita"],
            hora_fin_cita: data["hora_fin_cita"],
            motivo: data["nota"]
        }
        if (isEditMode){
            appointmentDataToSend['asistencia'] = data["asistencia"]
        }

        try {
            setLoading(true)
            //onProgress(true)
            if (isEditMode) {
                await updateAppointment(doctorId, appointmentId, appointmentDataToSend);
            } else {
                await createAppointment(doctorId, appointmentDataToSend)
            }
            dispatch(incrementDataRevision({ event: "appointmentRevision" }))
            dispatch(popDialog())
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
            //onProgress(false)
        }
    };

    return (<div className="appointment-container p-10">
        <div className="flex flex-col gap-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="patient"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            options={patients}
                            value={field?.value}
                            key={option => option["_id"]}
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option["_id"]}>
                                        {option.nombres} {option.apellidos} - {option.cedula}

                                    </li>
                                );
                            }}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            getOptionLabel={option => `${option.nombres} ${option.apellidos} - ${option.cedula}`}
                            onChange={handlePatienteChange}
                            renderInput={(params) => <TextField {...params} label="Seleccione un paciente..." required />}
                            disabled = {isEditMode}
                            required
                        />
                    )}
                />
                <Typography variant="h6" fontWeight="bold" className="self-start">
                    Información paciente
                </Typography>
                <div className="flex flex-row gap-x-5">
                    <DtxTextField
                        viewMode={true}
                        control={control}
                        name={"nombres"}
                        pattern={/^[A-Za-z ]+$/g}
                        patternMessage={"Solo se aceptan letras y espacios"}
                        label="Nombres"
                    />
                    <DtxTextField
                        viewMode={true}
                        control={control}
                        name={"apellidos"}
                        pattern={/^[A-Za-z ]+$/g}
                        patternMessage={"Solo se aceptan letras y espacios"}
                        label="Apellidos"
                    />
                    <DtxTextField
                        viewMode={true}
                        control={control}
                        name={"cedula"}
                        pattern={/^\d{10}$/g}
                        patternMessage={"# Cedula invalido"}
                        label="Cédula"
                    />
                </div>
                <div className="flex  flex-row gap-x-5">
                    <DtxSelect
                        viewMode={true}
                        control={control}
                        name={"sexo"}
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
                        name={"edad"}
                        label="Edad"
                        pattern={/^(?:1[0-4]\d|[0-9]{1,2})$|^150$/g}
                        patternMessage={"Edades válidas: 0-150 años."}
                    />
                </div>
                <div className="flex gap-x-5">
                    <DtxTextField
                        viewMode={true}
                        control={control}
                        name={"celular"}
                        label="Celular"
                        pattern={/^\d{10}$/g}
                        patternMessage={"# Celular invalido"}
                    />
                </div>
                <br/>
                <div hidden={!isEditMode}>
                <Typography variant="h6" fontWeight="bold" className="self-start">
                        Asistencia
                </Typography>
                <DtxCheckbox 
                    control={control}
                    label={"¿Se presentó?"}
                    name={"asistencia"}
                />
                </div>
                <Typography variant="h6" fontWeight="bold" className="self-start">
                    Horario
                </Typography>
                <div className="appointment-date-container flex flex-col gap-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <label htmlFor="fecha_cita">Fecha de cita:</label>
                        <Controller
                            name="fecha_cita"
                            control={control}
                            render={({ field }) => <DatePicker {...field} />}
                            required
                        />

                        <label htmlFor="hora_inicio_cita">Seleccionar Hora Inicio:</label>
                        <Controller
                            name="hora_inicio_cita"
                            control={control}
                            render={({ field }) => <TimeField {...field} />}
                            required
                        />

                        <label htmlFor="hora_fin_cita">Seleccionar Hora Fin:</label>
                        <Controller
                            name="hora_fin_cita"
                            control={control}
                            render={({ field }) => <TimeField {...field} />}
                            required
                        />

                    </LocalizationProvider>
                </div>
                <div className="appointment-footer flex flex-col gap-4">
                    <label>Agregar Nota</label>
                    <Controller
                        name="nota"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="outlined-multiline-flexible"
                                label="Nota"
                                multiline
                                maxRows={4}
                            />
                        )}
                    />
                    <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Enviar</button>
                </div>
            </form>
        </div>


    </div>)
}

export default AppointmentInfo;