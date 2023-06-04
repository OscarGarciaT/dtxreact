import React, { useState } from "react";
import "./button-group.css";
import Button from '@mui/material/Button';
import { useTheme } from "@emotion/react";



const ButtonGroup = ({ buttons, doSomethingAfterClick }) => {
  const [clickedId, setClickedId] = useState(-1);
  const theme = useTheme()

  const handleClick = (event, id) => {
    setClickedId(id);
    doSomethingAfterClick(event);
  };
  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <Button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          sx={{...(i === clickedId ? {backgroundColor: theme.palette.primary} : {})}}
          variant={i === clickedId ? "contained" : "outlined"}
        >
          {buttonLabel}
        </Button>
      ))}
    </>
  );
};

export default ButtonGroup;