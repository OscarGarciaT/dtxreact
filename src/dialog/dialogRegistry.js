import Placeholder from "../Pages/Placeholder";
import PatientInfo from "../Pages/PatientInfo";
import AppointmentInfo from "../Pages/AppointmentInfo";

export const registry = {
  PLACEHOLDER: Placeholder,
  EDIT_PATIENT_VIEW: PatientInfo,
  CREATE_PATIENT_VIEW: PatientInfo,
  CREATE_APPOINTMENT_VIEW: AppointmentInfo,
  EDIT_APPOINTMENT_VIEW: AppointmentInfo,
};

export const dialogTitles = {
  CREATE_PATIENT_VIEW: "Crear Paciente",
  EDIT_PATIENT_VIEW: "Editar Paciente",
  CREATE_APPOINTMENT_VIEW: "Agendar nueva cita",
  EDIT_APPOINTMENT_VIEW: "Editar cita",
};

export const dialogMaxSizes = {
  "max-w-xl": [],
  "max-w-2xl": [],
  "max-w-3xl": [],
  "max-w-4xl": ["CREATE_PATIENT_VIEW", "EDIT_PATIENT_VIEW", "CREATE_APPOINTMENT_VIEW","EDIT_APPOINTMENT_VIEW"],
  "max-w-5xl": [],
  "max-w-6xl": [],
  "max-w-7xl": [],
  "max-w-sm": [],
  "max-w-m": [],
  "max-w-lg": [],
};
