import {
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { Controller } from "react-hook-form";

const DtxRadioGroup = ({
  control,
  name,
  label,
  labelFontSize,
  options,
  required,
  setValue,
  defaultValue,
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
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => (
        <>
          {label && (
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{ fontSize: labelFontSize ?? "1rem" }}
            >
              {label}
            </FormLabel>
          )}
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
        </>
      )}
    />
  );
};

export default DtxRadioGroup;
