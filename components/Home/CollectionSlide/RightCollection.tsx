import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

interface Props {
  title: string;
}

const RightCollection = ({ title }: Props): JSX.Element => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={{
        backgroundColor: "#000",
        padding: { xs: "30px 0" },
        marginTop: { xs: "-4px", md: 0 },
      }}
    >
      <Typography className={styles.right__title}>{title}</Typography>
      <Typography className={styles.right__name__collection}>
        New Collection 2023
      </Typography>
      <Link
        href={{
          pathname: "/shop-products",
          query: { order_by: "asc", sort_by: "created_at" },
        }}
      >
        <button className={styles.right__button}>View All</button>
      </Link>
    </Stack>
  );
};

export default RightCollection;
