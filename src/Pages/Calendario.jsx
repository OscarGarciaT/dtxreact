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
      for (const cita of appointments){
        let newCita = {title:'', start:'', end:''}
        newCita.end = Date.parse(cita.hora_fin_cita)
        newCita.start = Date.parse(cita.hora_inicio_cita)
        newCita.title = cita.motivo
        array.push(newCita)
      }
      console.log("hola")
      console.log(array)
      return array
    }
    const events = setEvents()

    function renderEventContent(eventInfo) {
      return (
        <>
          <b>{eventInfo.timeText}</b>
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
                    end:"dayGridMonth,timeGridWeek,timeGridDay"
                }}
                events={events}
                eventContent={renderEventContent}

              />
            </div>
        </div>
    )
}

export default Calendario;