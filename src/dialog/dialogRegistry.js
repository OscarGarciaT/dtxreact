import Placeholder from "../Pages/Placeholder";
import PatientInfo from "../Pages/PatientInfo";

export const registry = {
  PLACEHOLDER: Placeholder,
  EDIT_PATIENT_VIEW: PatientInfo,
  CREATE_PATIENT_VIEW: PatientInfo,
};

export const dialogTitles = {
  CREATE_PATIENT_VIEW: "Crear Paciente",
  EDIT_PATIENT_VIEW: "Editar Paciente",
};

export const dialogMaxSizes = {
  "max-w-xl": [],
  "max-w-2xl": [],
  "max-w-3xl": [],
  "max-w-4xl": ["CREATE_PATIENT_VIEW", "EDIT_PATIENT_VIEW"],
  "max-w-5xl": [],
  "max-w-6xl": [],
  "max-w-7xl": [],
  "max-w-sm": [],
  "max-w-m": [],
  "max-w-lg": [],
};
