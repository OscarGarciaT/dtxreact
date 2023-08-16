import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAppointments } from "../../services/appointmentServices";

const useAppointments = () => {
    const doctorId = useSelector(({ user }) => user?.doctorId);
    const [apts, setApts] = useState([]);
    const appointmentRevision = useSelector(
      ({ revision }) => revision?.appointmentRevision
    );
    useEffect(() => {
      try {
        (async () => {
          if (doctorId) {
            const fetchApts = await getAppointments(doctorId);
            setApts(fetchApts);
          }
        })();
      } catch (err) {
        console.err("[CITAS] Error obteniendo los APTS");
      }
      // eslint-disable-next-line
    }, [appointmentRevision]);
    return apts;
  };

export default useAppointments;