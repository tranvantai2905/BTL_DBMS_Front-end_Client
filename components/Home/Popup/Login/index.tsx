import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./styles.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { loginUser } from "@/pages/api";
import { UserContext } from "@/pages/[productId]";
import ReloadContext from "@/contexts/ReloadContext";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNoti: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusAlert: React.Dispatch<React.SetStateAction<AlertColor>>;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<Props> = ({
  setOpen,
  setOpenNoti,
  setStatusAlert,
  setMessageAlert,
}) => {
  const { reload, setReload } = useContext(ReloadContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibility, setIsVisibility] = useState(false);
  const { handleClick } = useContext(UserContext);
  const handleChangeVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  const handleLogin = async () => {
    if (localStorage.getItem("user")) {
      setStatusAlert("success");
      setMessageAlert("Bạn hiện đã đăng nhập");
      setOpenNoti(true);
      setOpen(false);
    } else {
      const response = await loginUser({ email, password });
      if (response.status === "success") {
        setOpenNoti(true);
        setStatusAlert("success");
        setMessageAlert("Đăng nhập thành công");
        setOpen(false);
        localStorage.setItem("user", JSON.stringify(response.data));
        setReload(!reload);
      } else {
        setStatusAlert("error");
        setMessageAlert("Thiếu hoặc sai thông tin");
        setOpenNoti(true);
        setOpen(false);
      }
    }
  };

  return (
    <Stack className={styles.form}>
      <Stack alignItems="center">
        <Stack
          className={styles.wrapInput}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <input
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
            type="text"
          />
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack
          className={styles.wrapInput}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <input
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            name="email"
            type={isVisibility ? "text" : "password"}
          />
          <Box onClick={handleChangeVisibility}>
            {isVisibility ? (
              <VisibilityOffIcon sx={{ marginTop: "30px" }} />
            ) : (
              <VisibilityIcon sx={{ marginTop: "30px" }} />
            )}
          </Box>
        </Stack>
        <Typography
          sx={{ "&:hover": { cursor: "pointer", opacity: "0.9" } }}
          color="#ad2526"
          p="20px 0"
        >
          Quên mật khẩu
        </Typography>
        <button onClick={handleLogin} className={styles.buttonLogin}>
          Đăng nhập
        </button>
      </Stack>
    </Stack>
  );
};

export default Login;

export const Info: React.FC<Props> = ({
  setOpen,
  setOpenNoti,
  setStatusAlert,
  setMessageAlert,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    // const response = await loginUser(JSON.stringify({ email, password }));
    // if (response) {
    //   setOpenNoti(true);
    //   setStatusAlert("success");
    //   setMessageAlert("Đăng nhập thành công");
    //   setOpen(false);
    //   localStorage.setItem("user", JSON.stringify(response));
    // } else {
    //   setStatusAlert("error");
    //   setMessageAlert("Thiếu hoặc sai thông tin");
    //   setOpenNoti(true);
    // }
  };

  return (
    <Stack className={styles.form}>
      <Stack alignItems="center">
        <Stack
          className={styles.wrapInput}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <input
            className={styles.input}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên"
            name="name"
            type="text"
          />
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack
          className={styles.wrapInput}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <input
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            name="email"
            type={"text"}
          />
        </Stack>

        <button onClick={handleLogin} className={styles.buttonLogin}>
          Gửi
        </button>
      </Stack>
    </Stack>
  );
};
