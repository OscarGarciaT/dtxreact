import { useCallback, useState, useEffect } from "react";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";

import DtxTextField from "../Form/DtxTextField";
import DtxButtonGroup from "../Form/DtxButtonGroup";

const SimplifiedOralHigene = ({ control, watch, setValue }) => {
  const [totalDivision, setTotalDivision] = useState(1);

  const piezas_dentales_r1 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r1"
  );

  const piezas_dentales_r2 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r2"
  );

  const piezas_dentales_r3 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r3"
  );

  const piezas_dentales_r4 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r4"
  );

  const piezas_dentales_r5 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r5"
  );

  const piezas_dentales_r6 = watch(
    "salud_bucal.tabla_higiene.piezas_dentales_r6"
  );

  const placa = watch([
    "salud_bucal.tabla_higiene.placa.c1r1",
    "salud_bucal.tabla_higiene.placa.c1r2",
    "salud_bucal.tabla_higiene.placa.c1r3",
    "salud_bucal.tabla_higiene.placa.c1r4",
    "salud_bucal.tabla_higiene.placa.c1r5",
    "salud_bucal.tabla_higiene.placa.c1r6",
  ]);

  const calculo = watch([
    "salud_bucal.tabla_higiene.calculo.c2r1",
    "salud_bucal.tabla_higiene.calculo.c2r2",
    "salud_bucal.tabla_higiene.calculo.c2r3",
    "salud_bucal.tabla_higiene.calculo.c2r4",
    "salud_bucal.tabla_higiene.calculo.c2r5",
    "salud_bucal.tabla_higiene.calculo.c2r6",
  ]);

  const gingivitis = watch([
    "salud_bucal.tabla_higiene.gingivitis.c3r1",
    "salud_bucal.tabla_higiene.gingivitis.c3r2",
    "salud_bucal.tabla_higiene.gingivitis.c3r3",
    "salud_bucal.tabla_higiene.gingivitis.c3r4",
    "salud_bucal.tabla_higiene.gingivitis.c3r5",
    "salud_bucal.tabla_higiene.gingivitis.c3r6",
  ]);

  useEffect(() => {
    const piezas_dentales_habilitadas = [
      piezas_dentales_r1,
      piezas_dentales_r2,
      piezas_dentales_r3,
      piezas_dentales_r4,
      piezas_dentales_r5,
      piezas_dentales_r6,
    ];
    const newTotalDivision =
      piezas_dentales_habilitadas.filter(Boolean).length + 1;
    setTotalDivision(newTotalDivision);
  }, [
    piezas_dentales_r1,
    piezas_dentales_r2,
    piezas_dentales_r3,
    piezas_dentales_r4,
    piezas_dentales_r5,
    piezas_dentales_r6,
  ]);

  const sumarCeldas = useCallback(
    (values) => {
      const total = values.reduce((acc, curr) => {
        return acc + (Number(curr) || 0);
      }, 0);
      const totalConDivision = (total / totalDivision).toFixed(2);
      return totalConDivision;
    },
    [totalDivision]
  );

  useEffect(() => {
    const totalPlaca = sumarCeldas(placa);
    setValue("salud_bucal.tabla_higiene.placa.total_placa", totalPlaca);
    // eslint-disable-next-line
  }, [placa]);

  useEffect(() => {
    const totalCalculo = sumarCeldas(calculo);
    setValue("salud_bucal.tabla_higiene.calculo.total_calculo", totalCalculo);
    // eslint-disable-next-line
  }, [calculo]);

  useEffect(() => {
    const totalGingivitis = sumarCeldas(gingivitis);
    setValue(
      "salud_bucal.tabla_higiene.gingivitis.total_gingivitis",
      totalGingivitis
    );
    // eslint-disable-next-line
  }, [gingivitis]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", textAlign: "center" }}
      className="items-center  justify-center"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={9}>
              Higiene Oral Simplificada
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Piezas Dentales</TableCell>
            <TableCell align="center">Placa 0-1-2-3-4</TableCell>
            <TableCell align="center">Cálculo 0-1-2-3</TableCell>
            <TableCell align="center">Gingitivitis 0-1</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r1"}
                options={[
                  { label: "16", value: "16" },
                  { label: "17", value: "17" },
                  { label: "55", value: "55" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r1"}
                disabled={!piezas_dentales_r1}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r1"}
                disabled={!piezas_dentales_r1}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r1"}
                disabled={!piezas_dentales_r1}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r2"}
                options={[
                  { label: "11", value: "11" },
                  { label: "21", value: "21" },
                  { label: "51", value: "51" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r2"}
                disabled={!piezas_dentales_r2}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r2"}
                disabled={!piezas_dentales_r2}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r2"}
                disabled={!piezas_dentales_r2}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r3"}
                options={[
                  { label: "26", value: "26" },
                  { label: "27", value: "27" },
                  { label: "65", value: "65" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r3"}
                disabled={!piezas_dentales_r3}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r3"}
                disabled={!piezas_dentales_r3}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r3"}
                disabled={!piezas_dentales_r3}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r4"}
                options={[
                  { label: "36", value: "36" },
                  { label: "37", value: "37" },
                  { label: "75", value: "75" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r4"}
                disabled={!piezas_dentales_r4}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r4"}
                disabled={!piezas_dentales_r4}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r4"}
                disabled={!piezas_dentales_r4}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r5"}
                options={[
                  { label: "31", value: "31" },
                  { label: "41", value: "41" },
                  { label: "71", value: "71" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r5"}
                disabled={!piezas_dentales_r5}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r5"}
                disabled={!piezas_dentales_r5}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r5"}
                disabled={!piezas_dentales_r5}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">
              <DtxButtonGroup
                fullWidth
                control={control}
                name={"salud_bucal.tabla_higiene.piezas_dentales_r6"}
                options={[
                  { label: "46", value: "46" },
                  { label: "47", value: "47" },
                  { label: "85", value: "85" },
                ]}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.placa.c1r6"}
                disabled={!piezas_dentales_r6}
                defaultValue={0}
                pattern={/^[0-4]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.calculo.c2r6"}
                disabled={!piezas_dentales_r6}
                defaultValue={0}
                pattern={/^[0-3]$/g}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                name={"salud_bucal.tabla_higiene.gingivitis.c3r6"}
                disabled={!piezas_dentales_r6}
                defaultValue={0}
                pattern={/^[0-1]$/g}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Totales</TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                disabled
                name={"salud_bucal.tabla_higiene.placa.total_placa"}
                defaultValue={0}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                disabled
                name={"salud_bucal.tabla_higiene.calculo.total_calculo"}
                defaultValue={0}
              />
            </TableCell>
            <TableCell align="center">
              <DtxTextField
                control={control}
                className="w-20"
                disabled
                name={"salud_bucal.tabla_higiene.gingivitis.total_gingivitis"}
                defaultValue={0}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimplifiedOralHigene;
