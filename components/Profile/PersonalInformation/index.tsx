import { getUserById, updateUser } from "@/pages/api";
import {
  Alert,
  AlertColor,
  Box,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./styles.module.css";
import ReloadContext from "@/contexts/ReloadContext";

const PersonalInformation: React.FC = () => {
  const { reload, setReload } = useContext(ReloadContext);
  const [dataUser, setDataUser] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("error");
  const [messageAlert, setMessageAlert] = useState("Thiếu thông tin");

  const hanldOpenNoti = () => {
    setOpenNoti(true);
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

  const fetchDataUserById = async () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setName(user.user.name);
      const dataUser = await getUserById(user.user.userId);
      if (dataUser) {
        if (dataUser.data.data.user.name) {
          setName(dataUser.data.data.user.name);
        }
        if (dataUser.data.data.user.address) {
          setAddress(dataUser.data.data.user.address);
        }
        if (dataUser.data.data.user.email) {
          setEmail(dataUser.data.data.user.email);
        }
        if (dataUser.data.data.user.phone) {
          setPhone(dataUser.data.data.user.phone);
        }
        if (dataUser.data.data.user.sex) {
          if (dataUser.data.data.user.sex === "male") {
            setSex("1");
          } else {
            setSex("2");
          }
        }
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSaveInformation = async () => {
    const response = await updateUser(
      JSON.stringify({ name, phone, sex, address })
    );

    const formData = new FormData();
    if (avatar !== undefined) {
      formData.append("avatar", avatar);
    }
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("sex", sex);
    formData.append("address", address);

    const data = await updateUser(formData);
    setReload(!reload);
    setOpenNoti(true);
    setStatusAlert("success");
    setMessageAlert("Cập nhật thông tin thành công");
  };

  useEffect(() => {
    fetchDataUserById();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "70%" },
        marginLeft: { xs: "0", md: "100px" },
      }}
      alignItems="space-between"
    >
      <Typography
        sx={{ mt: { xs: "30px", md: "0" } }}
        mb="32px"
        textTransform="uppercase"
        fontSize="1.5rem"
      >
        Thông tin cá nhân
      </Typography>
      <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Stack sx={{ width: { xs: "100%", md: "50%" } }}>
          <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Tên khách hàng</label>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
              <img src="https://lep.vn/icons/ic-pencil.svg" />
            </Box>
          </Stack>
          {/* <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Email</label>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
              />
              <img src="https://lep.vn/icons/ic-pencil.svg" />
            </Box>
          </Stack> */}
          <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Số điện thoại</label>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="text"
              />
              <img src="https://lep.vn/icons/ic-pencil.svg" />
            </Box>
          </Stack>
          <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Địa chỉ</label>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <input
                className={styles.input}
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                type="text"
              />
              <img src="https://lep.vn/icons/ic-pencil.svg" />
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ width: { xs: "100%", md: "50%" } }}>
          <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Chọn ảnh đại diện</label>
            <input
              className={styles.input}
              onChange={handleAvatarChange}
              type="file"
            />
          </Stack>
          <Stack sx={{ width: { xs: "100%", md: "80%" } }} mb="46px">
            <label className={styles.label}>Giới tính</label>
            <select
              className={styles.select}
              onChange={(e) => setSex(e.target.value)}
              value={sex}
            >
              <option value={2}>Nữ</option>
              <option value={1}>Nam</option>
            </select>
          </Stack>
          <Box>
            <button
              onClick={handleSaveInformation}
              className={styles.buttonLogin}
            >
              Lưu
            </button>
          </Box>
        </Stack>
      </Stack>
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
    </Stack>
  );
};

export default PersonalInformation;
