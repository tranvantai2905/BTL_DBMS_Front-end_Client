import Head from "next/head";
import Image from "next/image";
import Layout from "../../components/Layout";
import SliderImage from "../../components/Home/SliderImage";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CollectionItem from "@/components/Collection/CollectionItem";
import OrderItem from "@/components/Checkout/OrderItem";
import { myCart } from "../api";
import { useEffect, useState } from "react";

export default function Checkout() {
  return (
    <>
      <Layout>
        <Box className="container">
          <Typography
            sx={{ paddingBottom: { xs: "1rem", md: "5rem" } }}
            className={styles.title}
          >
            Giỏ hàng
          </Typography>
          <OrderItem />
        </Box>
      </Layout>
    </>
  );
}
