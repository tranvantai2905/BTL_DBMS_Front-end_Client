import Head from "next/head";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CollectionItem from "@/components/Collection/CollectionItem";
import Layout from "../../../components/Layout";
import Sidebar from "@/components/Profile/Sidebar";
import PersonalOrder from "@/components/Profile/PersonalOrder";
import { useEffect, useState } from "react";

export default function personalOrder() {
  const [name, setName] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user") || "");
      setName(user.user.userId);
    }
  }, []);
  return (
    <>
      <Layout>
        <Box className="container">
          <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
            <Sidebar />
            <PersonalOrder />
          </Stack>
        </Box>
      </Layout>
    </>
  );
}
