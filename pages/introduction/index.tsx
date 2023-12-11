import Layout from "@/components/Layout";
import { Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import Image from "next/image";
import Lam from "../../assets/image/Lam.jpg";
import An from "../../assets/image/An.jpeg";
import Tai from "../../assets/image/Tai.jpeg";
import Nam from "../../assets/image/Nam.jpeg";

export default function Home() {
  return (
    <Layout>
      <Stack className="container" justifyContent="center" alignItems="center">
        <Typography
          mb="10px"
          textTransform="uppercase"
          fontSize="2.5rem"
          fontWeight="500"
          color="#444"
          mt="20px"
        >
          BTL Lập Trình Web
        </Typography>
        <Typography
          className={styles.text}
          borderBottom="1px solid #d9d9d9"
          borderTop="1px solid #d9d9d9"
        >
          Giảng viên hướng dẫn: Nguyễn Hữu Hiếu
        </Typography>
        <Typography
          className={styles.text}
          m="10px"
          textTransform="uppercase"
          fontWeight="400 !important"
        >
          Danh sách thành viên
        </Typography>

        <Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          justifyContent="space-around"
          width="80%"
          height="100%"
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            border="1px solid #444"
            p="20px 10px"
            borderRadius="10px"
            padding="70px"
            sx={{ marginTop: { xs: "60px", md: "0" } }}
          >
            <Image
              style={{ borderRadius: "50%", width: "250px", height: "250px" }}
              alt="Lâm"
              src={An}
            />
            <Typography fontSize="2rem" mt="50px">
              Hồ Ngọc An
            </Typography>
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            border="1px solid #444"
            p="20px 10px"
            borderRadius="10px"
            padding="70px"
            sx={{ marginTop: { xs: "60px", md: "0" } }}
          >
            <Image
              style={{ borderRadius: "50%", width: "250px", height: "250px" }}
              alt="Lâm"
              src={Lam}
            />
            <Typography fontSize="2rem" mt="50px">
              Lê Văn Lâm
            </Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{ flexDirection: { xs: "column", md: "row" } }}
          justifyContent="space-around"
          width="80%"
          height="100%"
          m="60px 0"
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            border="1px solid #444"
            p="20px 10px"
            borderRadius="10px"
            padding="70px"
            sx={{ marginTop: { xs: "60px", md: "0" } }}
          >
            <Image
              style={{ borderRadius: "50%", width: "250px", height: "250px" }}
              alt="Lâm"
              src={Tai}
            />
            <Typography fontSize="2rem" mt="50px">
              Trần Văn Tài
            </Typography>
          </Stack>
          <Stack
            justifyContent="center"
            alignItems="center"
            border="1px solid #444"
            p="20px 10px"
            borderRadius="10px"
            padding="70px"
            sx={{ marginTop: { xs: "60px", md: "0" } }}
          >
            <Image
              style={{ borderRadius: "50%", width: "250px", height: "250px" }}
              alt="Lâm"
              src={Nam}
            />
            <Typography fontSize="2rem" mt="50px">
              Võ Hoài Nam
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  );
}
