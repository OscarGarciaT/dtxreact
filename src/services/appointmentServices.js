import { createRequest } from "../utils/requestUtils";

export const createAppointment  = (doctorId, appointmentData) => {
    return createRequest()
        .post(`patients/${doctorId}/create_appointment`, {appointmentData })
        .then((res) => res.data);
};