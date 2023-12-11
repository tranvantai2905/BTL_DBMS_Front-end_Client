import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import SliderImage from "../components/Home/SliderImage";
import { Box, Stack } from "@mui/material";
import Breadcrumb from "@/components/BestSeller/Breadscrumb";
import Fillter from "@/components/BestSeller/Fillter";
import Pagi from "@/components/BestSeller/Pagi";
import { getCategories } from "./api";
import { useEffect, useState } from "react";
import Result from "@/components/BestSeller/Result";

export type CategoryTyp = {
  categoryId: string;
  name: string;
  description: string;
};

export default function BestSeller() {
  const [totalPage, setTotalPage] = useState(0);
  const [categories, setCategories] = useState<CategoryTyp[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response?.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <Box
          mt="120px"
          maxWidth={{
            xs: "540px",
            sm: "800px",
            md: "1000px",
            lg: "1500px",
            xl: "1567px",
          }}
          mx="6%"
          pb="3rem"
          pl={{ xs: "1rem", sm: "0rem" }}
        >
          <Breadcrumb />
          <Box
            mx="auto"
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
          >
            <Fillter categories={categories} />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width={{ xs: "100%", md: "74%" }}
              mt={{ xs: "10px", md: "0px" }}
            >
              <Result title="sản phẩm bán chạy" setTotal={setTotalPage} />
              <Pagi total={totalPage} />
            </Box>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
