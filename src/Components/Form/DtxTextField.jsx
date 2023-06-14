import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxTextField = ({ control, name, required, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={""}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
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
