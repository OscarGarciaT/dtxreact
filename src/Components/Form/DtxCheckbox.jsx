import { FormControlLabel, Checkbox } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxCheckbox = ({ control, name, label, required, defaultValue }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid },
      }) => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={value}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                inputRef={ref}
                color={"primary"}
              />
            }
            label={
              <span style={{ color: invalid ? "red" : "inherit" }}>
                {label ?? ""}
              </span>
            }
            error={invalid}
            required={required}
          />
        </>
      )}
    />
  );
};

export default DtxCheckbox;
