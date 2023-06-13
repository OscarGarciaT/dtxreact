import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DtxTextField = ({ control, name, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField onChange={field.onChange} value={field.value} {...props} />
      )}
    />
  );
};

export default DtxTextField;
