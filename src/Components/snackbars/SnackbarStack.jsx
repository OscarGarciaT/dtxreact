import { Icon, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shiftSnackbar } from "../../slices/snackbarSlice";

const SnackbarStack = () => {
  const snackbarStack = useSelector(({ snackbar }) => snackbar.stack);
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const lastSnackbar = snackbarStack[snackbarStack.length - 1];
    if (lastSnackbar) {
      enqueueSnackbar(lastSnackbar?.message, {
        variant: lastSnackbar?.variant,
        action: (snackbarId) => (
          <IconButton onClick={() => closeSnackbar(snackbarId)}>
            <Icon color="primary">close</Icon>
          </IconButton>
        ),
      });
      setTimeout(() => {
        dispatch(shiftSnackbar());
      }, 10000);
    }
  }, [snackbarStack.length]);

  return null;
};

export default SnackbarStack;
