import React, { useState } from "react";
import { AlertColor, Box, Stack, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { signUpUser } from "@/pages/api";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenNoti: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusAlert: React.Dispatch<React.SetStateAction<AlertColor>>;
  setMessageAlert: React.Dispatch<React.SetStateAction<string>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup: React.FC<Props> = ({
  setOpen,
  setOpenNoti,
  setStatusAlert,
  setMessageAlert,
  setIsLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isVisibility, setIsVisibility] = useState(false);

  const handleChangeVisibility = () => {
    setIsVisibility(!isVisibility);
  };

  const handleSignup = async () => {
    const response = await signUpUser({ name, email, password });
    if (response.status === "success") {
      setOpenNoti(true);
      setStatusAlert("success");
      setMessageAlert("Đăng kí thành công");
      setIsLogin(true);
    } else {
      setStatusAlert("error");
      setMessageAlert("Thiếu hoặc sai thông tin");
      setOpenNoti(true);
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
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
        <button onClick={handleSignup} className={styles.buttonLogin}>
          Đăng kí
        </button>
      </Stack>
    </Stack>
  );
};

export default Signup;
