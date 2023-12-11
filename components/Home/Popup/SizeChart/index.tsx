import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Stack,
  Typography,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

const SizeChart = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event | undefined = undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <div>
      <IconButton style={{ marginRight: "20px" }} onClick={handleClickOpen}>
        <PersonIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Box>
          <DialogTitle>
            <Stack
              borderBottom="0.5px solid #444"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Typography
                padding="10px 100px"
                fontSize="2rem"
                textTransform="uppercase"
                color="#ad2526"
              >
                Size Chart
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
            </Stack>
          </DialogTitle>
          <DialogContent></DialogContent>
        </Box>
      </Dialog>
      <Snackbar
        open={openNoti}
        autoHideDuration={null}
        onClose={handleCloseNoti}
      >
        <Alert
          onClose={handleCloseNoti}
          severity={statusAlert}
          sx={{ width: "100%" }}
        >
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SizeChart;
