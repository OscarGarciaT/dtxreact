import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { capitalizeFirstLetter } from "../../utils/dataUtils";

const DtxSelect = ({
  control,
  name,
  label,
  options,
  required,
  defaultValue,
  viewMode = false,
  width,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) =>
        viewMode ? (
          <div className="flex flex-col">
            <Typography variant="caption" color="primary">
              {label}
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {field?.value ? capitalizeFirstLetter(field.value) : "Sin información"}
            </Typography>
          </div>
        ) : (
          <FormControl
            sx={{ width: width ?? "230px" }}
            error={invalid}
            required={required}
          >
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
        )
      }
    />
  );
};

export default DtxSelect;
