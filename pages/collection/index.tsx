import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";
import SliderImage from "../../components/Home/SliderImage";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CollectionItem from "@/components/Collection/CollectionItem";

export default function Collection() {
  return (
    <>
      <Layout>
        <Box className="container">
          <Stack
            width="100%"
            height="100%"
            justifyContent="center"
            className={styles.bannerContainer}
          >
            <Typography className={styles.bannerText}>
              Bộ Sưu Tập Thời Trang được Lep' chọn lọc để phù hợp nhất với xu
              hướng thời trang trên Thế giới
            </Typography>
            <Typography className={styles.bannerText}>
              We Hope You Will Enjoy It!
            </Typography>
          </Stack>

          <Stack>
            <CollectionItem />
            <CollectionItem />
            <CollectionItem />
            <CollectionItem />
          </Stack>
        </Box>
      </Layout>
    </>
  );
}
