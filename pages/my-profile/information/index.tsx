import Head from "next/head";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import CollectionItem from "@/components/Collection/CollectionItem";
import Layout from "../../../components/Layout";
import Sidebar from "@/components/Profile/Sidebar";
import PersonalInformation from "@/components/Profile/PersonalInformation";
import ReloadContext from "@/contexts/ReloadContext";
import { useState } from "react";

export default function Information() {
  return (
    <>
      <Layout>
        <Box className="container">
          <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
            <Sidebar />
            <PersonalInformation />
          </Stack>
        </Box>
      </Layout>
    </>
  );
}
