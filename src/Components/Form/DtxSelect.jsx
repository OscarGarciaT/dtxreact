import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";

const DtxSelect = ({ control, name, label, options, required, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={""}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormControl fullWidth error={invalid} required={required}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} {...props}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default DtxSelect;
