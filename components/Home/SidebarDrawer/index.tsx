import React from "react";
import { Typography, Stack, Box, IconButton } from "@mui/material";
import styles from "./styles.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import logoImage from "../../../assets/image/logo2.png";
import Image from "next/image";

interface SidebarDrawerProps {
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
}

const SidebarDrawer = ({
  openMobile,
  setOpenMobile,
}: SidebarDrawerProps): JSX.Element => {
  return (
    <Box>
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="200px"
      >
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box pl="20px" py="10px">
            <Image src={logoImage} alt="Lep logo" height={42} />
          </Box>
          <IconButton onClick={() => setOpenMobile(!openMobile)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Link className={styles.textNavigate} href="/">
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
            pathname: "/best-seller",
            query: { order_by: "desc", sort_by: "order_count" },
          }}
          style={{ color: "#000" }}
        >
          <Typography
            sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
            className={styles.headerLeft__item}
          >
            Best Seller
          </Typography>
        </Link>
        <Link
          className={styles.headerLeft__link__item}
          href={{
            pathname: "/shop-products",
            query: { order_by: "asc", sort_by: "created_at" },
          }}
          style={{ color: "#000" }}
        >
          <Typography
            sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
            className={styles.headerLeft__item}
          >
            Sản phẩm
          </Typography>
        </Link>
        <Link className={styles.textNavigate} href="/introduction">
          <Typography
            sx={{ fontSize: { sm: "0.7rem", md: "1rem" } }}
            className={styles.headerLeft__item}
          >
            Giới thiệu
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
};

export default SidebarDrawer;
