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

export const updatePatient = (doctorId, patientId, patientData) => {
  return createRequest()
    .put(`patients/${doctorId}/patient/${patientId}`, { patientData })
    .then((res) => res.data);
};

export const getAllDiagnoses = () => {
  return createRequest()
    .get(`patients/diagnoses`)
    .then(res => res.data);
}
