import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useForm, useController } from 'react-hook-form';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonGroup from '../ButtonGroup';
import DtxTextField from '../Form/DtxTextField';




const SimplifiedOralHigene = ({ control, watch }) => {

    const [sumaCol1, setSumaCol1] = useState(0);
    const [sumaCol2, setSumaCol2] = useState(0);
    const [sumaCol3, setSumaCol3] = useState(0);
    const [totalDivision, setTotalDivision] = useState(0)

    const [enableRow1, setEnableRow1] = useState(true)
    const [enableRow2, setEnableRow2] = useState(true)
    const [enableRow3, setEnableRow3] = useState(true)
    const [enableRow4, setEnableRow4] = useState(true)
    const [enableRow5, setEnableRow5] = useState(true)
    const [enableRow6, setEnableRow6] = useState(true)



    const numbersCol1 = watch(['c1r1', 'c1r2', 'c1r3', 'c1r4', 'c1r5', 'c1r6', 'c2r1', 'c2r2', 'c2r3', 'c2r4', 'c2r5', 'c2r6', 'c3r1', 'c3r2', 'c3r3', 'c3r4', 'c3r5', 'c3r6']);

    const showRow1 = () => {
        if (enableRow1) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow1(false);
    }

    const showRow2 = () => {
        if (enableRow2) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow2(false);
    }

    const showRow3 = () => {
        if (enableRow3) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow3(false);
    }

    const showRow4 = () => {
        if (enableRow4) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow4(false);
    }

    const showRow5 = () => {
        if (enableRow5) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow5(false);
    }

    const showRow6 = () => {
        if (enableRow6) {
            setTotalDivision(totalDivision + 1)
        }
        setEnableRow6(false);
    }

    const actualizarSuma = () => {
        const sumaCol1 = numbersCol1.slice(0, 6).reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        const sumaCol2 = numbersCol1.slice(6, 12).reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        const sumaCol3 = numbersCol1.slice(12,).reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        setSumaCol1((sumaCol1 / (totalDivision || 0)).toFixed(2));
        setSumaCol2((sumaCol2 / (totalDivision || 0)).toFixed(2));
        setSumaCol3((sumaCol3 / (totalDivision || 0)).toFixed(2));
    }

    useEffect(() => {
        actualizarSuma();
    }, [numbersCol1])


    return (

        <TableContainer component={Paper} sx={{ maxWidth: "100%", textAlign: 'center' }} className="flex flex-row justify-center" >
            <TableHead>
                <TableRow>
                    <TableCell align="center" colSpan={9}>
                        Higiene Oral Simplificada
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center'>Piezas Dentales</TableCell>
                    <TableCell align="right">Placa 0-1-2-3-4</TableCell>
                    <TableCell align="right">Cálculo 0-1-2-3</TableCell>
                    <TableCell lign="right">Gingitivitis 0-1</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["16", "17", "55"]}
                        doSomethingAfterClick={showRow1}
                        name={"row1"}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r1"} disabled={enableRow1} pattern={"^[1-4]$"} patternMessage={"Err"} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r1"} disabled={enableRow1} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r1"} disabled={enableRow1} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["11", "21", "51"]}
                        doSomethingAfterClick={showRow2}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r2"} disabled={enableRow2} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r2"} disabled={enableRow2} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r2"} disabled={enableRow2} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["26", "27", "65"]}
                        doSomethingAfterClick={showRow3}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r3"} disabled={enableRow3} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r3"} disabled={enableRow3} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r3"} disabled={enableRow3} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["36", "37", "75"]}
                        doSomethingAfterClick={showRow4}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r4"} disabled={enableRow4} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r4"} disabled={enableRow4} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r4"} disabled={enableRow4} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["31", "41", "71"]}
                        doSomethingAfterClick={showRow5}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r5"} disabled={enableRow5} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r5"} disabled={enableRow5} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r5"} disabled={enableRow5} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><ButtonGroup
                        buttons={["46", "47", "85"]}
                        doSomethingAfterClick={showRow6}
                    /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c1r6"} disabled={enableRow6} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c2r6"} disabled={enableRow6} /></TableCell>
                    <TableCell><DtxTextField control={control} name={"c3r6"} disabled={enableRow6} /></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center' >Totales</TableCell>
                    <TableCell><TextField variant="outlined" value={sumaCol1} className='w-20' /></TableCell>
                    <TableCell><TextField variant="outlined" value={sumaCol2} className='w-20' /></TableCell>
                    <TableCell><TextField variant="outlined" value={sumaCol3} className='w-20' /></TableCell>
                </TableRow>
            </TableHead>
        </TableContainer>

    );
};

export default SimplifiedOralHigene;
