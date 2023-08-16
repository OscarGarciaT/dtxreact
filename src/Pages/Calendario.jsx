import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from "react-redux";
import { pushDialog } from "../slices/dialogSlice";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAppointments from '../utils/hooks/useAppointments';
import usePatients from "../utils/hooks/usePatients";


const Calendario = () => {
    const appointments = useAppointments();

    const setEvents = () => {
      let array = []
      const patients = usePatients();

      for (const cita of appointments){
        let newCita = {title:'', start:'', end:'', extendedProps: {cita: {}, description:''}}

        // FECHA
        const date = new Date(cita.fecha_cita);
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        const day = date.getUTCDate();

        //GETTING START TIME
        let dateTime = new Date(cita.hora_inicio_cita);
        let hours = dateTime.getUTCHours();
        let minutes = dateTime.getUTCMinutes();
        let seconds = dateTime.getUTCSeconds();

        //START FULL DATE
        const startDate = new Date();
        startDate.setUTCHours(hours);
        startDate.setUTCMinutes(minutes);
        startDate.setUTCSeconds(seconds);
        startDate.setUTCFullYear(year);
        startDate.setUTCMonth(month);
        startDate.setUTCDate(day);

        //GETTING END TIME
        dateTime = new Date(cita.hora_fin_cita);
        hours = dateTime.getUTCHours();
        minutes = dateTime.getUTCMinutes();
        seconds = dateTime.getUTCSeconds();

        //START FULL DATE
        const endDate = new Date();
        endDate.setUTCHours(hours);
        endDate.setUTCMinutes(minutes);
        endDate.setUTCSeconds(seconds);
        endDate.setUTCFullYear(year);
        endDate.setUTCMonth(month);
        endDate.setUTCDate(day);
        
        newCita.start = startDate
        newCita.end = endDate

        if (cita.motivo){
          newCita.title = cita.motivo
        }

        if (patients.length>0){
          const paciente = patients.filter((patient) => patient._id===cita.paciente_id)[0]
          if (paciente!=undefined){
            newCita.extendedProps.description = paciente.nombres + " " + paciente.apellidos
          }
        } 
        newCita.extendedProps.cita = cita
        array.push(newCita)
      }
      
      return array
    }
    const events = setEvents()

    //Renderizar modal de appointment
    const dispatch = useDispatch();
    const handleCrearNuevaCita = () => {
        dispatch(
            pushDialog({ id: "CREATE_APPOINTMENT_VIEW", props: { mode: "CREATE" } })
        );
    }
    const handleEditarCita = (appointmentData) => {
      dispatch(pushDialog({ id: "EDIT_APPOINTMENT_VIEW", props: { mode: "EDIT", appointmentData } }));
    };

    return (
        <div className="calendario-containter p-3">
            <div className="calendario-header flex flex-row justify-between">
                <Typography variant="h5" fontWeight="bold" className="self-start">
                    Calendario <CalendarMonthIcon />
                </Typography>
                <Button variant="contained" onClick={handleCrearNuevaCita}>Nueva Cita<AddIcon /></Button>
            </div>
            <div className="p-3">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={'timeGridWeek'}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end:"dayGridMonth,timeGridWeek,timeGridDay"
                }}
                height={"90vh"}
                events={events}
                eventDidMount={(info) => {
                  return new bootstrap.Popover(info.el, {
                    title: info.event.title?info.event.title:'Cita',
                    placement: "auto",
                    trigger: "hover",
                    customClass: "popoverStyle",
                    content:`<p>${info.event.start?info.event.start.toTimeString().split(' ')[0]: ''}${info.event.end?' - '+info.event.end.toTimeString().split(' ')[0]: ''}
                             <br\>${info.event.extendedProps.description? info.event.extendedProps.description: ''}</p>`,
                    html:true
                  });
                }}
                eventClick={(info)=>{handleEditarCita(info.event._def.extendedProps.cita)}}
              />
            </div>
        </div>
    )
}

export default Calendario;