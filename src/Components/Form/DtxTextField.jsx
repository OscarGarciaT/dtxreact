import { FormHelperText, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxTextField = ({
  control,
  name,
  required,
  pattern,
  patternMessage,
  defaultValue = "",
  viewMode = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
        pattern: {
          value: pattern,
          message: patternMessage ?? "Entrada invalida",
        },
      }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) =>
        viewMode ? (
          <div className="flex flex-col">
            <Typography variant="caption" color="primary">
              {props.label}
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {field?.value ? field.value : "Sin información"}
            </Typography>
          </div>
        ) : (
          <>
            <TextField
              required={required}
              error={invalid}
              inputRef={field.ref}
              {...field}
              {...props}
            />
            {error && (
              <FormHelperText error sx={{ fontSize: "0.6rem" }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        )
      }
    />
  );
};

export default DtxTextField;
