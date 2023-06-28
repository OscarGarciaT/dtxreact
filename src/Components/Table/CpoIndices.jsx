import { useState, useEffect } from 'react';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import DtxTextField from '../Form/DtxTextField';

import { TextField } from '@mui/material';


const CpoIndices = ({ control, watch, setValue }) => {
    const rowD = watch(["indices_cpo_cbo.rowD.DC1", "indices_cpo_cbo.rowD.DP", "indices_cpo_cbo.rowD.DO"])
    const rowd = watch(["indices_cpo_cbo.rowd.dc2", "indices_cpo_cbo.rowd.de", "indices_cpo_cbo.rowd.do"])

    const sumarFila = () => {
        const sumRowD = rowD.reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        const sumRowd = rowd.reduce((acum, num) => {
            return (Number(acum) || 0) + (Number(num) || 0)
        }, 0);
        setValue("indices_cpo_cbo.total_rowD",sumRowD)
        setValue("indices_cpo_cbo.total_rowd",sumRowd)
    }
    
    useEffect(() => { sumarFila() }, [rowD, rowd])


    return (
        <div>

            <div className='flex flex-row justify-center items-center'>
                <TableContainer sx={{ maxWidth: "100%", textAlign: 'center' }}>
                    <TableRow>
                        <TableCell align='center' rowSpan={2}>D</TableCell>
                        <TableCell align='center'>C</TableCell>
                        <TableCell align='center'>P</TableCell>
                        <TableCell align='center'>O</TableCell>
                        <TableCell align='center'>Total</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowD.DC1"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowD.DP"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowD.DO"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.total_rowD"} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center' rowSpan={2}>d</TableCell>
                        <TableCell align='center'>c</TableCell>
                        <TableCell align='center'>e</TableCell>
                        <TableCell align='center'>o</TableCell>
                        <TableCell align='center'>Total</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowd.dc2"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowd.de"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.rowd.do"} /></TableCell>
                        <TableCell align='center'><DtxTextField className='w-20' control={control} name={"indices_cpo_cbo.total_rowd"}/></TableCell>
                    </TableRow>
                </TableContainer>
            </div>
        </div>
    );
};

export default CpoIndices;