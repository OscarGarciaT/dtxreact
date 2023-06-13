import { useDispatch, useSelector } from "react-redux";
import { popDialog } from "../slices/dialogSlice";
import { registry, dialogTitles, dialogMaxSizes } from "./dialogRegistry";
import {
  AppBar,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useState } from "react";

const DefaultDialog = () => {
  return <h2>No Content</h2>;
};

const getViewMaxSize = (viewId) => {
  for (let [key, value] of Object.entries(dialogMaxSizes)) {
    if (value.includes(viewId)) return key;
  }
  return "max-w-4xl";
};

const DialogStack = () => {
  const [processing, setProcessing] = useState(false);
  const dialogStack = useSelector(({ dialog }) => dialog.stack);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(popDialog());
  };

  let size = "";
  let dialogContent = dialogStack.map((item, indx) => {
    const dialogProps = item?.props;
    const viewId = item?.id;

    let View = registry[viewId] ?? DefaultDialog;
    let title = dialogTitles[viewId] ?? "Dialog";
    if (!View) {
      console.error(
        `[DialogStack] Can't open dialog, view ${viewId} not found`
      );
      return null;
    }
    size = getViewMaxSize(viewId);

    return [
      <DialogTitle
        key={"title_" + indx}
        component="div"
        className={indx === dialogStack.length - 1 ? "" : "hidden"}
        sx={{ padding: 0 }}
      >
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full overflow-x-auto px-8">
            <div className="flex flex-1 text-16 md:text-18 px-10">{title}</div>
            {processing && (
              <Box mt={1}>
                <CircularProgress color="inherit" className="p-4" />
              </Box>
            )}
            <IconButton color="inherit" onClick={close}>
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>,
      <DialogContent
        key={"content_" + indx}
        className={
          "px-8 py-4 sm:px-12 sm:py-8 " +
          (indx === dialogStack.length - 1 ? "" : "hidden")
        }
      >
        <View
          key={"view_" + indx}
          onProgress={(progress) => {
            setProcessing(progress);
          }}
          {...(dialogProps ?? {})}
        />
      </DialogContent>,
    ];
  });

  return (
    <Dialog
      classes={{
        paper: size + " min-w-fit w-full m-12 md:m-24 z-10",
      }}
      onClose={close}
      open={dialogStack.length > 0}
    >
      {dialogContent}
    </Dialog>
  );
};

export default DialogStack;
