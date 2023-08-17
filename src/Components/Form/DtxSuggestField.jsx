import { Autocomplete, TextField, FormHelperText } from "@mui/material";
import useAllDiagnoses from '../../utils/hooks/useDiagnoses';
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Typography } from "@mui/material";

const DtxSuggestField = ({
    control,
    name,
    required,
    defaultValue = "",
    viewMode = false,
    ...props

}) => {
    const diagnoses = useAllDiagnoses()

    const defaultOptions = {
        options: diagnoses.length > 0 ? diagnoses : [],
        getOptionLabel: (options) => `${options.codigo} - ${options.descripcion}`
    }

    const [diagnosis, setDiagnosis] = useState(null)

    return (
        <Controller
            name={name}
            control={control}
            rules={{
                required: false
            }}
            defaultValue={diagnosis}
            render={({ field, fieldState: { invalid, error } }) =>
                viewMode ? (
                    <div className="flex flex-col">
                        <Typography variant="caption" color="primary">
                            {props.label}
                        </Typography>
                        <Typography variant="body1" fontWeight={700}>
                            {field?.value.codigo ? `${field.value.codigo} - ${field.value.descripcion}` : "Sin información"}
                        </Typography>
                    </div>
                ) : (
                    <>
                        <Autocomplete
                            {...defaultOptions}
                            {...field}
                            {...props}
                            inputRef={field.ref}
                            multiple={false}
                            error={invalid}
                            value={diagnosis}
                            key={option => option["_id"]}
                            onChange={(event, newValue) => {
                                setDiagnosis(newValue);
                                field.onChange(newValue);
                            }}
                            renderInput={(params) =>
                                <TextField {...params} label="Selecciona un diagnostico" />
                            }
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option._id}>
                                        {option.codigo}-{option.descripcion}
                                    </li>
                                )
                            }}

                        />
                    </>
                )
            }


        />

    )
}

export default DtxSuggestField