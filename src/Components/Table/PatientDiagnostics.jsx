
import {
  Icon,
  IconButton, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import { useFieldArray } from "react-hook-form";
import DtxTextField from "../Form/DtxTextField";
import DtxRadioGroup from "../Form/DtxRadioGroup";

const PatientDiagnostics = (props) => {
  const isEditMode = props?.isEditMode;
  const control = props?.control;
  const setValue = props?.setValue;

  const {
    fields: diagnosticos,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "diagnosticos",
  });

  const addNewDiagnostic = () => {
    append({
      number: diagnosticos.length + 1,
      preDefLarge: "",
      cie: "",
      preDef: 1,
      canEdit: true,
    });
  };

  return (
    <div>
      <div className="flex gap-2">
        <Typography variant="h6" fontWeight="bold" className="self-start my-3">
          11. Diagnóstico
        </Typography>
        <IconButton disabled={!isEditMode} onClick={addNewDiagnostic}>
          <Icon color={isEditMode ? "primary" : undefined}>add_circle</Icon>
        </IconButton>
      </div>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">
                PRE=PRESUNTIVO / DEF=DEFINITIVO
              </TableCell>
              <TableCell align="center">CIE</TableCell>
              <TableCell align="center">PRE/DEF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isEditMode ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">
                      Es necesario crear el paciente para agregar Diagnosticos
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : !diagnosticos.length ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="w-full flex justify-center">
                    <Typography variant="caption">Sin registros</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              diagnosticos.map((row, index) => {
                const canEdit = row.canEdit;

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <DtxTextField
                        control={control}
                        name={`diagnosticos.${index}.number`}
                        label={""}
                        viewMode={true}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DtxTextField
                        control={control}
                        name={`diagnosticos.${index}.preDefLarge`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DtxTextField
                        control={control}
                        name={`diagnosticos.${index}.cie`}
                        label={""}
                        viewMode={!canEdit}
                      />
                    </TableCell>
                    <TableCell className="flex flex-col items-center justify-center">
                      <div
                        className={`${
                          !canEdit ? "pointer-events-none opacity-75" : ""
                        }`}
                      >
                        <DtxRadioGroup
                          control={control}
                          row
                          name={`diagnosticos.${index}.preDef`}
                          setValue={setValue}
                          labelFontSize={20}
                          options={[
                            { value: "1", label: "Pre" },
                            { value: "2", label: "Def" },
                          ]}
                        />
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      className={`${
                        !canEdit
                          ? "pointer-events-none opacity-75 grayscale"
                          : ""
                      }`}
                    >
                      {canEdit && (
                        <IconButton onClick={() => remove(index)}>
                          <Icon color="error">close</Icon>
                        </IconButton>
                      )}

                      {!canEdit && <Typography> - </Typography>}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientDiagnostics;
