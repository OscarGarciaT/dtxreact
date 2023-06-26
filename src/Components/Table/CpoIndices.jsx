import React, { useState } from 'react';
import { useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DtxTextField from '../Form/DtxTextField';
import { TextField } from '@mui/material';


const CpoIndices = ({ control, watch }) => {
    const [sumRowD, setSumRowD] = useState(0);
    const [sumRowd, setSumRowd] = useState(0);

    const rowD = watch(["DC1", "DP", "DO"])
    const rowd = watch(["dc2", "de", "do"])

    const sumarFila = () => {
        const sumRowD = rowD.reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        const sumRowd = rowd.reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        setSumRowD(sumRowD)
        setSumRowd(sumRowd)
    }
    useEffect(() => { sumarFila() }, [rowD, rowd])


    return (
        <div>

            <div className='flex flex-row justify-center items-center ' component={Paper} >
                <TableContainer sx={{ maxWidth: "100%", textAlign: 'center' }}>
                    <TableRow>
                        <TableCell align='center' rowSpan={2}>D</TableCell>
                        <TableCell align='center'>C</TableCell>
                        <TableCell align='center'>P</TableCell>
                        <TableCell align='center'>O</TableCell>
                        <TableCell align='center'>Total</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><DtxTextField control={control} name={"DC1"} /></TableCell>
                        <TableCell align='center'><DtxTextField control={control} name={"DP"} /></TableCell>
                        <TableCell align='center'><DtxTextField control={control} name={"DO"} /></TableCell>
                        <TableCell align='center'><TextField variant="outlined" value={sumRowD} className='w-20' /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center' rowSpan={2}>d</TableCell>
                        <TableCell align='center'>c</TableCell>
                        <TableCell align='center'>e</TableCell>
                        <TableCell align='center'>o</TableCell>
                        <TableCell align='center'>Total</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><DtxTextField control={control} name={"dc2"} /></TableCell>
                        <TableCell align='center'><DtxTextField control={control} name={"de"} /></TableCell>
                        <TableCell align='center'><DtxTextField control={control} name={"do"} /></TableCell>
                        <TableCell align='center'><TextField variant="outlined" value={sumRowd} className='w-20' /></TableCell>
                    </TableRow>
                </TableContainer>
            </div>
        </div>
    );
};

export default CpoIndices;