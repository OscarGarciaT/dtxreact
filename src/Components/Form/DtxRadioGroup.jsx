import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";

const DtxRadioGroup = ({
  control,
  name,
  options,
  required,
  setValue,
  ...props
}) => {
  const handleChange = (event) => {
    setValue(name, event.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={""}
      render={({ field, fieldState: { invalid, error } }) => (
        <RadioGroup {...field} {...props} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
          {invalid && <FormHelperText error>{error?.message}</FormHelperText>}
        </RadioGroup>
      )}
    />
  );
};

export default DtxRadioGroup;
