import { createRequest } from "../utils/requestUtils";

export const getPatients = (doctorId, params) => {
  return createRequest()
    .get(`patients/${doctorId}`, { params })
    .then((res) => res.data);
};

export const createPatient = (doctorId, patientData) => {
  return createRequest()
    .post(`patients/${doctorId}`, { patientData })
    .then((res) => res.data);
};
