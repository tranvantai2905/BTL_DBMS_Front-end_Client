import React, { useEffect, useState } from "react";
import { Stack, Box, Typography, Button, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Link from "next/link";
import SliderMutipleImages from "../SliderMutipleImages";
import { getAllProducts, getProduct } from "@/pages/api";

interface Props {
  title: string;
}

const PromotionSlide = ({ title = "No name" }: Props): JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1200px)");
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const response = await getAllProducts();
    setProducts(response?.data.data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="4rem"
      mb="4rem"
    >
      <Typography className={styles.title}>{title}</Typography>
      <Link href="/best-seller">
        <button className={styles.button}>Shop Now</button>
      </Link>
      <Box sx={{ marginTop: "20px", width: "85%" }}>
        <SliderMutipleImages
          products={products}
          numberSlideToShow={isTablet ? (isMobile ? 1 : 3) : 4}
          numberSlideToScroll={isTablet ? 1 : 2}
        />
      </Box>
    </Box>
  );
};

export default PromotionSlide;
