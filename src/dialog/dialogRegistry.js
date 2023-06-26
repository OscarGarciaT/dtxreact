import Placeholder from "../Pages/Placeholder";
import PatientInfo from "../Pages/PatientInfo";
//import PatientCreationNew from "../Pages/PatientCreationNew";
import PatientCreation from "../Pages/PatientCreation";

export const registry = {
  PLACEHOLDER: Placeholder,
  PATIENT_INFO: PatientInfo,
  CREATE_PATIENT_VIEW: PatientCreation,
};

export const dialogTitles = {
  CREATE_PATIENT_VIEW: "Crear Paciente",
};

export const dialogMaxSizes = {
  "max-w-xl": [],
  "max-w-2xl": ["CREATE_PATIENT_VIEW"],
  "max-w-4xl": [],
  "max-w-5xl": [],
  "max-w-6xl": [],
  "max-w-7xl": [],
  "max-w-sm": [],
  "max-w-m": [],
  "max-w-lg": [],
};
