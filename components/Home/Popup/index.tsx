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
import Login, { Info } from "./Login";
import Signup from "./Signup";
import styles from "./styles.module.css";

const Popup = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");

  const handleClickOpen = () => {
    if (!localStorage.getItem("user")) {
      setOpen(true);
    }
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
      <IconButton onClick={handleClickOpen}>
        <PersonIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <Box className={styles.wrapperPopup}>
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
                Tài Khoản
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
            </Stack>
            <Stack
              p="20px 0"
              borderBottom="0.5px solid #444"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Typography
                className={styles.headerTitle}
                tabIndex={0}
                onClick={() => setIsLogin(true)}
              >
                Đăng nhập
              </Typography>
              <Typography
                className={styles.headerTitle}
                tabIndex={0}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isLogin ? (
                <Login
                  setOpen={setOpen}
                  setOpenNoti={setOpenNoti}
                  setStatusAlert={setStatusAlert}
                  setMessageAlert={setMessageAlert}
                />
              ) : (
                <Signup
                  setOpen={setOpen}
                  setOpenNoti={setOpenNoti}
                  setStatusAlert={setStatusAlert}
                  setMessageAlert={setMessageAlert}
                  setIsLogin={setIsLogin}
                />
              )}
            </DialogContentText>
          </DialogContent>
        </Box>
      </Dialog>
      <Snackbar
        open={openNoti}
        autoHideDuration={null}
        onClose={handleCloseNoti}
      >
        <Alert onClose={handleCloseNoti} severity={statusAlert}>
          {messageAlert}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Popup;

export const AuthDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  // const [open, setOpen] = useState(false);
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
      <Dialog open={open} onClose={handleClose}>
        <Box className={styles.wrapperPopup}>
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
                fontSize="1.5rem"
                textTransform="uppercase"
                color="#ad2526"
              >
                Tài Khoản
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
            </Stack>
            <Stack
              p="20px 0"
              borderBottom="0.5px solid #444"
              flexDirection="row"
              justifyContent="space-around"
            >
              <Typography
                className={styles.headerTitle}
                tabIndex={0}
                onClick={() => setIsLogin(true)}
              >
                Đăng nhập
              </Typography>
              <Typography
                className={styles.headerTitle}
                tabIndex={0}
                onClick={() => setIsLogin(false)}
              >
                Đăng ký
              </Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {isLogin ? (
                <Login
                  setOpen={setOpen}
                  setOpenNoti={setOpenNoti}
                  setStatusAlert={setStatusAlert}
                  setMessageAlert={setMessageAlert}
                />
              ) : (
                <Signup
                  setOpen={setOpen}
                  setOpenNoti={setOpenNoti}
                  setStatusAlert={setStatusAlert}
                  setMessageAlert={setMessageAlert}
                  setIsLogin={setIsLogin}
                />
              )}
            </DialogContentText>
          </DialogContent>
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

export const InfoDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  // const [open, setOpen] = useState(false);
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
      <Dialog open={open} onClose={handleClose}>
        <Box className={styles.wrapperPopup}>
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
                fontSize="1.5rem"
                textTransform="uppercase"
                color="#ad2526"
              >
                Thông báo khi có hàng
              </Typography>
              <CloseIcon
                onClick={handleClose}
                sx={{ "&:hover": { cursor: "pointer" } }}
              />
            </Stack>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Info
                setOpen={setOpen}
                setOpenNoti={setOpenNoti}
                setStatusAlert={setStatusAlert}
                setMessageAlert={setMessageAlert}
              />
            </DialogContentText>
          </DialogContent>
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
