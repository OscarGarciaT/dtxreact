import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from "react-redux";
import { pushDialog } from "../slices/dialogSlice";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import useAppointments from '../utils/hooks/useAppointments';


const Calendario = () => {
  const appointments = useAppointments();
  const setEvents = () => {
    let array = []
    for (const cita of appointments) {
      let newCita = { title: '', start: '', end: '' }

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
      newCita.title = cita.motivo
      array.push(newCita)
    }

    return array
  }
  const events = setEvents()

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <br />
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  //Renderizar modal de appointment
  const dispatch = useDispatch();
  const handleCrearNuevaCita = () => {
    dispatch(
      pushDialog({ id: "CREATE_APPOINTMENT_VIEW", props: { mode: "CREATE" } })
    );
  }

  return (
    <div className="calendario-containter p-10">
      <div className="calendario-header flex flex-row justify-between">
        <Typography variant="h6" fontWeight="bold" className="self-start">
          Calendario <CalendarMonthIcon />
        </Typography>
        <Button variant="contained" onClick={handleCrearNuevaCita}>Nueva Cita<AddIcon /></Button>
      </div>
      <div className="p-5">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView={'timeGridWeek'}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          events={events}
          eventContent={renderEventContent}

        />
      </div>
    </div>
  )
}

export default Calendario;