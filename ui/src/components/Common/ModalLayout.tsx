import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

type ModalLayoutProps = React.PropsWithChildren<{
  handleClose: () => void;
  maxWidth: string;
  title: string;
}>;

const ModalLayout = ({
  children,
  handleClose,
  maxWidth,
  title,
}: ModalLayoutProps) => {
  return (
    <Dialog
      fullWidth
      // @ts-expect-error autofill of arbitrary value is not handled.
      maxWidth={maxWidth || "sm"}
      open={true}
      onClose={handleClose}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </BootstrapDialogTitle>
      <DialogContent>{children}</DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ModalLayout;
