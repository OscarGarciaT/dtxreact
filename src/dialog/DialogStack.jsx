import { useDispatch, useSelector } from "react-redux";
import { popDialog } from "../slices/dialogSlice";
import registry from "./dialogRegistry";
import { Dialog } from "@mui/material";

const DefaultDialog = () => {
  return <h2>No Content</h2>;
};

const DialogStack = () => {
  const dialogStack = useSelector(({ dialog }) => dialog.stack);
  const dispatch = useDispatch();

  const createCloseHandler = (options) => (event, reason) => {
    if (options.disableBackdropClick && reason === "backdropClick") return;
    dispatch(popDialog());
  };

  return (
    <>
      {dialogStack.map((dialog, index) => {
        const Component = registry[dialog.id] ?? DefaultDialog;
        return (
          <Dialog
            key={index}
            open={index === dialogStack.length - 1}
            onClose={createCloseHandler(dialog.options ?? {})}
            {...(dialog.dialogProps ?? {})}
          >
            <Component {...(dialog.props ?? {})} />
          </Dialog>
        );
      })}
    </>
  );
};

export default DialogStack;
