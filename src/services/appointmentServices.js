import { createRequest } from "../utils/requestUtils";

export const createAppointment  = (doctorId, appointmentData) => {
    return createRequest()
        .post(`patients/${doctorId}/create_appointment`, {appointmentData })
        .then((res) => res.data);
};

export const getAppointments = (doctorId) => {
    return createRequest()
      .get(`patients/${doctorId}/appointments`)
      .then((res) => res.data);
  };