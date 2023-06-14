import { createRequest } from "../utils/requestUtils";

export const getPatients = () => {
  return createRequest()
    .get("patients")
    .then((res) => res.data);
};

export const createPatient = (patientData) => {
  return createRequest()
    .post("patients", { patientData })
    .then((res) => res.data);
};
