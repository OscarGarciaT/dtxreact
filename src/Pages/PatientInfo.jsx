import React from 'react'; 
import { useState, memo } from "react";
import { useForm } from "react-hook-form";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import SOralHigiene from "../Components/Table/SimplifiedOralHigene";
import CpoIndices from "../Components/Table/CpoIndices";
import PatientDiagnostics from "../Components/Table/PatientDiagnostics";
import Odontograma from "../Components/Odontograma";

import DtxTextField from "../Components/Form/DtxTextField";
import DtxSelect from "../Components/Form/DtxSelect";
import DtxRadioGroup from "../Components/Form/DtxRadioGroup";
import DtxCheckbox from "../Components/Form/DtxCheckbox";
import DtxButtonGroup from "../Components/Form/DtxButtonGroup";
import PatientTreatments from "../Components/Table/PatientTreatments";

import { createPatient, updatePatient } from "../services/patientServices";

import { useDispatch, useSelector } from "react-redux";
import { popDialog } from "../slices/dialogSlice";
import { incrementDataRevision } from "../slices/revisionSlice";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PatientInfo = ({ onProgress, ...props }) => {
  const mode = props?.mode;
  const patientData = props?.patientData;
  const patientId = patientData?._id;
  const isEditMode = mode === "EDIT";

  const doctorId = useSelector(({ user }) => user.doctorId);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [placedSymbols, setPlacedSymbols] = useState(
    patientData?.odontograma?.simbolos ?? []
  );
  const [drawings, setDrawings] = useState(
    patientData?.odontograma?.anotaciones ?? []
  );

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { control, watch, handleSubmit, setValue, formState } = useForm({
    mode: "onChange",
    defaultValues: patientData,
  });

  const handleSubmitPatient = async (model) => {
    try {
      setLoading(true);
      onProgress(true);

      if (isEditMode) {
        await updatePatient(doctorId, patientId, model);
      } else {
        await createPatient(doctorId, {
          ...model,
          odontograma: { simbolos: placedSymbols, anotaciones: drawings },
        });
      }

      dispatch(incrementDataRevision({ event: "patientRevision" }));
      dispatch(popDialog());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      onProgress(false);
    }
  };

  return (
    <div className={`ml-3 ${loading ? "opacity-70 pointer-events-none" : ""}`}>
      <div>
        <Box sx={{ width: "100%", paddingTop: 2 }}>
          <Typography variant="h6" fontWeight="bold" className="self-start">
            Información general
          </Typography>
          <br />
          <div className="flex flex-col gap-5">
            <div className="flex">
              <DtxTextField
                viewMode={isEditMode}
                control={control}
                pattern={/^\d+$/g}
                patternMessage={"# de historia clinica invalido"}
                name={"info_general.num_historia_clinica"}
                label="N. Historia Clínica"
                required
              />
            </div>
            <div className="flex flex-row gap-x-5">
              <DtxTextField
                viewMode={false}
                control={control}
                name={"info_general.nombres"}
                pattern={/^[A-Za-z ]+$/g}
                patternMessage={"Solo se aceptan letras y espacios"}
                label="Nombres"
                required
              />
              <DtxTextField
                viewMode={false}
                control={control}
                name={"info_general.apellidos"}
                pattern={/^[A-Za-z ]+$/g}
                patternMessage={"Solo se aceptan letras y espacios"}
                label="Apellidos"
                required
              />
              <DtxTextField
                viewMode={false}
                control={control}
                name={"info_general.cedula"}
                pattern={/^\d{10}$/g}
                patternMessage={"# Cedula invalido"}
                label="Cédula"
                required
              />
            </div>

            <div className="flex  flex-row gap-x-5">
              <DtxSelect
                viewMode={false}
                control={control}
                name={"info_general.sexo"}
                label="Sexo"
                options={[
                  { label: "Masculino", value: "masculino" },
                  { label: "Femenino", value: "femenino" },
                  { label: "Otro", value: "otro" },
                ]}
                defaultValue="masculino"
              />

              <DtxTextField
                viewMode={false}
                control={control}
                name={"info_general.edad"}
                label="Edad"
                pattern={/^(?:1[0-4]\d|[0-9]{1,2})$|^150$/g}
                patternMessage={"Edades válidas: 0-150 años."}
              />
            </div>

            <div className="flex gap-x-5">
              <DtxTextField
                viewMode={false}
                control={control}
                name={"info_general.celular"}
                label="Celular"
                pattern={/^\d{10}$/g}
                patternMessage={"# Celular invalido"}
              />
            </div>

            <div
              className={`pt-5 ${
                isEditMode ? "pointer-events-none opacity-75" : ""
              }`}
            >
              <DtxRadioGroup
                control={control}
                row
                name={"info_general.rango_edad"}
                label={"Rango de Edad"}
                setValue={setValue}
                labelFontSize={20}
                options={[
                  { value: "1", label: "Menor de 1 año" },
                  { value: "2", label: "1-4 años" },
                  { value: "3", label: "5-9 años programado" },
                  { value: "4", label: "5-14 años programado" },
                  { value: "5", label: "10-14  años programado" },
                  { value: "6", label: "Mayor de 20 años" },
                ]}
              />
            </div>

            <div
              className={`pb-4 ${
                isEditMode ? "pointer-events-none opacity-75" : ""
              }`}
            >
              <Typography variant="h6" fontWeight="bold" className="self-start">
                Estado de gestación
              </Typography>
              <DtxCheckbox
                control={control}
                label={"Embarazada"}
                name={"info_general.embarazada"}
              />
            </div>
          </div>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Frontal" {...a11yProps(0)} sx={{ fontSize: 20 }} />
              <Tab label="Posterior" {...a11yProps(1)} sx={{ fontSize: 20 }} />
            </Tabs>
          </Box>

          <TabPanel sx={{ color: "red" }} value={tabValue} index={0}>
            <div className="flex flex-col gap-8">
              <div id="appointmentReason">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  1. Motivo de consulta
                </Typography>
                <DtxTextField
                  viewMode={isEditMode}
                  control={control}
                  name={"motivo_consulta"}
                  fullWidth
                  multiline
                  required
                />
              </div>
              <div id="currentDiseaseOrProblem">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  2. Enfermedad o Problema actual
                </Typography>
                <DtxTextField
                  viewMode={isEditMode}
                  control={control}
                  name={"enfermedad_problema_actual"}
                  multiline
                  fullWidth
                  defaultValue={""}
                />
              </div>
              <div id="familyHistory">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  3. Antecedentes Familiares
                </Typography>
                <div
                  className={`grid grid-cols-4 ${
                    isEditMode ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  <DtxCheckbox
                    control={control}
                    label={"Alergia Antiobiótico"}
                    name={"antecedentes_familiares.alergia_antibiotico"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Alergia Anestesia"}
                    name={"antecedentes_familiares.alergia_anestesia"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Hemorragias"}
                    name={"antecedentes_familiares.hemorragias"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"VIH Sida"}
                    name={"antecedentes_familiares.vih"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Tuberculosis"}
                    name={"antecedentes_familiares.tuberculosis"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Asma"}
                    name={"antecedentes_familiares.asma"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Diabetes"}
                    name={"antecedentes_familiares.diabetes"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Hipertensión"}
                    name={"antecedentes_familiares.hipertension"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Enf. Cardiaca"}
                    name={"antecedentes_familiares.enfermedad_cardiaca"}
                  />
                  <DtxCheckbox
                    control={control}
                    label={"Otro"}
                    name={"antecedentes_familiares.otro"}
                  />
                </div>
                <br />
                <DtxTextField
                  viewMode={isEditMode}
                  control={control}
                  name={"antecendentes_personales"}
                  defaultValue={"No refiere antecedentes personales"}
                  multiline
                  fullWidth
                />
              </div>
              <div id="vitalSigns">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  4. Signos Vitales
                </Typography>
                <br />
                <div className="flex flex-row gap-5 ">
                  <DtxTextField
                    viewMode={isEditMode}
                    control={control}
                    name={"signos_vitales.presion_arterial"}
                    label="Presión Arterial"
                    required
                  />
                  <DtxTextField
                    viewMode={isEditMode}
                    control={control}
                    name={"signos_vitales.frecuencia_cardiaca"}
                    label="Frecuencia Cardiaca"
                    required
                  />
                  <DtxTextField
                    viewMode={isEditMode}
                    control={control}
                    name={"signos_vitales.temperatura_centigrados"}
                    label="Temperatura C°"
                    required
                  />
                  <DtxTextField
                    viewMode={isEditMode}
                    control={control}
                    name={"signos_vitales.frec_respiratoria_min"}
                    label="F. Respiratoria/min"
                    required
                  />
                </div>
                <br />
                <DtxTextField
                  viewMode={isEditMode}
                  control={control}
                  name={"signos_vitales.anotaciones"}
                  label="Anotaciones"
                  multiline
                  fullWidth
                />
              </div>
              <div id="examinationStomatognathicSystem">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  5. Examen del Sistema Estomatognático
                </Typography>
                <div
                  className={`grid grid-cols-4 mb-3 ${
                    isEditMode ? "pointer-events-none opacity-75" : ""
                  }`}
                >
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.labios"}
                    label="1. Labios"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.mejillas"}
                    label="2. Mejillas"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.maxilar_superior"}
                    label="3. Maxilar Superior"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.maxilar_inferior"}
                    label="4. Maxilar Inferior"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.lengua"}
                    label="5. Lengua"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.paladar"}
                    label="6. Paladar"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.piso"}
                    label="7. Piso"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.carrillos"}
                    label="8. Carrillos"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.glandulas_salivales"}
                    label="9. Glándulas Salivales"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.oro_faringe"}
                    label="10. Oro Faringe"
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.atm"}
                    label="11. A. T. M."
                  />
                  <DtxCheckbox
                    control={control}
                    name={"sistema_estomatognatico.ganglios"}
                    label="12. Ganglios"
                  />
                </div>
                <DtxTextField
                  viewMode={isEditMode}
                  control={control}
                  name={"sistema_estomatognatico.anotaciones"}
                  label="Anotaciones"
                  multiline
                  fullWidth
                />
              </div>
              <div
                id="odontogram"
                className={`${
                  isEditMode ? "pointer-events-none opacity-90" : ""
                }`}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  6. Odontograma
                </Typography>
                <Odontograma
                  placedSymbols={placedSymbols}
                  setPlacedSymbols={setPlacedSymbols}
                  drawings={drawings}
                  setDrawings={setDrawings}
                  isEditDialog={isEditMode}
                />
              </div>

              <Typography variant="h6" fontWeight="bold" className="self-start">
                7. Indicadores de Salud Bucal
              </Typography>
              <div
                id="oralHealthIndicators"
                className={`flex flex-row gap-4 ${
                  isEditMode ? "pointer-events-none opacity-90" : ""
                }`}
              >
                <SOralHigiene
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
                <div className="flex flex-col justify-center">
                  <span>Enfermedad Periodontal: </span>
                  <DtxButtonGroup
                    fullWidth
                    orientation={"vertical"}
                    control={control}
                    name={"salud_bucal.enfermedad_periodontal"}
                    options={[
                      { value: "leve", label: "LEVE" },
                      { value: "moderada", label: "MODERADA" },
                      { value: "severa", label: "SEVERA" },
                    ]}
                  />
                  <br />
                  <br />
                  <span>Mal Oclusión: </span>
                  <DtxButtonGroup
                    fullWidth
                    orientation={"vertical"}
                    control={control}
                    name={"salud_bucal.mal_oclusion"}
                    options={[
                      { value: "angle_1", label: "Angle I" },
                      { value: "angle_2", label: "Angle II" },
                      { value: "angle_3", label: "Angle III" },
                    ]}
                  />
                  <br />
                  <br />
                  <span>Fluorosis: </span>
                  <DtxButtonGroup
                    fullWidth
                    orientation={"vertical"}
                    control={control}
                    name={"salud_bucal.fluorosis"}
                    options={[
                      { value: "leve", label: "LEVE" },
                      { value: "moderada", label: "MODERADA" },
                      { value: "severa", label: "SEVERA" },
                    ]}
                  />
                </div>
              </div>

              <div id="cpoCboIndices">
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  className="self-start"
                >
                  8. Índices CPO-<sub>CBO</sub>
                </Typography>
                <div
                  className={`${
                    isEditMode ? "pointer-events-none opacity-90" : ""
                  }`}
                >
                  <CpoIndices
                    setValue={setValue}
                    control={control}
                    watch={watch}
                  />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <div id="planesDiagnostico">
              <Typography
                variant="h6"
                fontWeight="bold"
                className="self-start mb-2"
              >
                10. Planes de diagnóstico, terapéutico y educacional
              </Typography>
              <div
                className={`${
                  isEditMode ? "my-3 pointer-events-none opacity-90" : ""
                }`}
              >
                <DtxCheckbox
                  control={control}
                  name={"planes_varios.biometria"}
                  label="Biometría"
                />
                <DtxCheckbox
                  control={control}
                  name={"planes_varios.quimica_sanguinea"}
                  label="Química sanguínea"
                />
                <DtxCheckbox
                  control={control}
                  name={"planes_varios.rayos_x"}
                  label="Rayos-x"
                />
                <DtxCheckbox
                  control={control}
                  name={"planes_varios.otros"}
                  label="Otros"
                />
              </div>
              <DtxTextField
                viewMode={isEditMode}
                className="mb-5"
                control={control}
                multiline
                name={"planes_varios.anotaciones"}
                label="Anotaciones"
                fullWidth
              />
            </div>

            <div id="diagnostico">
              <PatientDiagnostics
                isEditMode={isEditMode}
                control={control}
                patientData={patientData}
                setValue={setValue}
              />
            </div>
            <div id="tratamiento">
              <PatientTreatments
                isEditMode={isEditMode}
                control={control}
                patientData={patientData}
              />
            </div>
            <div id="datosOdontólogo" className="hidden">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody align="center">
                    <TableRow>
                      <TableCell>Fecha de apertura</TableCell>
                      <TableCell>Fecha de control</TableCell>
                      <TableCell>Profesional</TableCell>
                      <TableCell>Código</TableCell>
                      <TableCell>Firma</TableCell>
                      <TableCell>Número de hoja</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <input type="date" className="h-10" />
                      </TableCell>
                      <TableCell>
                        <input type="date" className="h-10" />
                      </TableCell>
                      <TableCell>
                        <TextField />
                      </TableCell>
                      <TableCell>
                        <TextField label="Código" />
                      </TableCell>
                      <TableCell>
                        <TextField defaultValue="Nicole Ávila" />
                      </TableCell>
                      <TableCell>
                        <input type="number" className="h-10" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </TabPanel>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit(handleSubmitPatient)}
        >
          {isEditMode ? "Guardar cambios" : "Enviar"}
        </Button>
      </div>
    </div>
  );
};

export default memo(PatientInfo);
