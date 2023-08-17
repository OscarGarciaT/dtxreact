import React from 'react';
import { Button, ButtonGroup, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxButtonGroup = ({ control, name, options, fullWidth, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { onChange, value, name },
        fieldState: { invalid, error },
      }) => (
        <div>
          <ButtonGroup
            color="primary"
            variant="outlined"
            aria-label={name}
            fullWidth={fullWidth}
            {...props}
          >
            {options.map((option) => (
              <Button
                key={option.value}
                onClick={() => onChange(option.value)}
                variant={value === option.value ? "contained" : "outlined"}
              >
                {option.label}
              </Button>
            ))}
          </ButtonGroup>
          {invalid && (
            <FormHelperText style={{ color: "red" }}>
              {error?.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
};

export default DtxButtonGroup;
