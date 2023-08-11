import { createRequest } from "../utils/requestUtils";

export const createAppointment  = (doctorId, appointmentData) => {
    return createRequest()
        .post(`appointments/${doctorId}/create_appointment`, {appointmentData })
        .then((res) => res.data);
};

export const getAppointments = (doctorId) => {
    return createRequest()
      .get(`appointments/${doctorId}/all`)
      .then((res) => res.data);
  };