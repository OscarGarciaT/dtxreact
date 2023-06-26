import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxTextField = ({ control, name, required, pattern, patternMessage, defaultValue, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required,
        pattern: {
          value: pattern,
          message: patternMessage
        }
      }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          className='w-20'
          required={required}
          error={invalid}
          helperText={error?.message}
          inputRef={field.ref}
          {...field}
          {...props}
        />
      )}
    />
  );
};

export default DtxTextField;
