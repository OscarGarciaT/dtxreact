import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from "react-redux";
import { pushDialog } from "../slices/dialogSlice";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import '/src/index.css';

const Calendario = () => {
    const data = [
        {
          Id: 1,
          Subject: 'Meeting',
          StartTime: new Date(2023, 1, 15, 10, 0),
          EndTime: new Date(2023, 1, 15, 12, 30),
        },
      ];
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
            <div>
                <ScheduleComponent
                    selectedDate={new Date(2023, 1, 15)}
                    eventSettings={{
                        dataSource: data,
                    }}
                >
                    <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
                </ScheduleComponent>
            </div>
        </div>
    )
}

export default Calendario;