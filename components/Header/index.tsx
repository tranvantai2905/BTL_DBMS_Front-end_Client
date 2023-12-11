import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Drawer,
  Menu,
  Icon,
  Box,
  Popover,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import styles from "./styles.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SidebarDrawer from "../Home/SidebarDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, IconButton } from "@mui/material";
import Link from "next/link";
import Popup from "../Home/Popup";
import { getUserById } from "@/pages/api";
import { useContext } from "react";
import ReloadContext from "@/contexts/ReloadContext";
import PersonIcon from "@mui/icons-material/Person";
import HistoryIcon from "@mui/icons-material/History";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logoImage from "../../assets/image/logo2.png";
import Image from "next/image";

const Header: React.FC = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [name, setName] = useState("");
  const { reload, setReload } = useContext(ReloadContext);
  const [localReload, setLocalReload] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("error");
  const [messageAlert, setMessageAlert] = useState("Thiếu thông tin");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "my-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    setOpenNoti(true);
    setStatusAlert("success");
    setMessageAlert("Logout thành công");
    setReload(!reload);
    setName("");
    setLocalReload(!localReload);
  };

  const fetchData = async () => {
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user") || "");
      const dataUser = await getUserById(data?.user?.userId);
      if (dataUser) {
        if (dataUser?.data?.data?.user?.name) {
          setName(dataUser?.data?.data?.user?.name);
        }
      }
    }
    setLocalReload(!localReload);
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      fetchData();
    }
  }, [reload]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  return (
    <Stack
      className={styles.headerContainer}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {isMobile ? (
        <IconButton onClick={() => setOpenMobile((pre) => !pre)}>
          <MenuIcon />
        </IconButton>
      ) : (
        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-around"
          width="50%"
        >
          <Link className={styles.headerLeft__link__item} href="/">
            <Typography
              sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
              className={styles.headerLeft__item}
            >
              Trang chủ
            </Typography>
          </Link>
          <Link
            className={styles.headerLeft__link__item}
            href={{
              pathname: "/shop-products",
              query: { order_by: "asc", sort_by: "created_at" },
            }}
          >
            <Typography
              sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
              className={styles.headerLeft__item}
            >
              Sản phẩm
            </Typography>
          </Link>
          <Link className={styles.headerLeft__link__item} href="/introduction">
            <Typography
              sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
              className={styles.headerLeft__item}
            >
              Giới thiệu
            </Typography>
          </Link>
        </Stack>
      )}
      {!isMobile && (
        <Link href="/">
          <div className={styles.headerCenter}>
            <Image src={logoImage} alt="Lep logo" height={42} />
          </div>
        </Link>
      )}
      <Stack
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        className={styles.headerRight}
      >
        <Box display="flex" flexDirection="row" alignItems="center" mr="20px">
          <Popup />
          <Typography onMouseOver={handleClick}>
            {name !== "" && !isMobile && name}
          </Typography>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            onMouseLeave={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Link
              href="/my-profile/information"
              className={styles.headerLeft__link__item}
            >
              <Box display="flex" alignItems="center" p="0 10px">
                <PersonIcon />
                <Typography sx={{ p: 2 }}>Tài khoản của bạn</Typography>
              </Box>
            </Link>
            <Link
              href="/my-profile/personal-order"
              className={styles.headerLeft__link__item}
            >
              <Box display="flex" alignItems="center" p="0 10px">
                <HistoryIcon />
                <Typography sx={{ p: 2 }}>Lịch sử giao dịch</Typography>
              </Box>
            </Link>
            <Box
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={handleLogout}
              display="flex"
              alignItems="center"
              p="0 10px"
            >
              <ExitToAppIcon />
              <Typography sx={{ p: 2 }}>Logout</Typography>
            </Box>
          </Popover>
        </Box>
        <Link href="/checkout">
          <IconButton className={styles.headerRight__item}>
            <ShoppingCartIcon />
          </IconButton>
        </Link>
      </Stack>
      <Drawer
        variant="temporary"
        anchor="left"
        open={openMobile}
        onClose={() => setOpenMobile((pre) => !pre)}
        ModalProps={{ keepMounted: true }}
      >
        <SidebarDrawer openMobile={openMobile} setOpenMobile={setOpenMobile} />
      </Drawer>
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

export default Header;
