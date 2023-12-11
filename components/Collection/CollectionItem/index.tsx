import { Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.css";

const CollectionItem: React.FC = () => {
  return (
    <Grid container m="3rem 0">
      <Grid item xs={5}>
        <div className={styles.image}>
          <img
            width="100%"
            height="100%"
            src="https://cdn.lep.vn//2022/10/images/categories/1667911533591-SLIDE-MOBILE-3-500x500.jpeg"
          />
        </div>
      </Grid>
      <Grid item xs={7}>
        <Stack height="100%" justifyContent="center" alignItems="center">
          <Typography className={styles.mainText}>Blueming</Typography>
          <Typography className={styles.subText}>
            New Collection 2022
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CollectionItem;
