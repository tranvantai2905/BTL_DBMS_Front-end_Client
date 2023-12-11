import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";

const LocationBanner = (): JSX.Element => {
  return (
    <Stack className={styles.background}>
      <div className={styles.image}>
        {/* <img src="https://lep.vn/images/preview-store.png" /> */}
      </div>
      <Stack
        p="30px 0"
        sx={{ flexDirection: { xs: "column", md: "row" } }}
        justifyContent="space-around"
      >
        <Stack>
          <Typography className={styles.title}>Hà nội</Typography>
          <Typography className={styles.address}>
            - 244 Bà Triệu | 0398 841 816
          </Typography>
          <Typography className={styles.address}>
            - 428 Hồ Gươm | 0398 841 125
          </Typography>
          <Typography className={styles.address}>
            - 296 Hồ Tây | 0398 841 142
          </Typography>
        </Stack>
        <Stack>
          <Typography className={styles.title}>Hồ Chí Minh</Typography>
          <Typography className={styles.address}>
            - 210 Hoàng Diệu | 0398 841 542
          </Typography>
          <Typography className={styles.address}>
            - 218 Lý Thường Kiệt | 0313 841 816
          </Typography>
          <Typography className={styles.address}>
            - 94 Điện Biên Phủ | 0398 841 123
          </Typography>
        </Stack>
        <Stack>
          <Typography className={styles.title}>Các tỉnh thành khác</Typography>
          <Typography className={styles.address}>
            - 12 Dĩ An, Bình Dương | 0398 123 816
          </Typography>
          <Typography className={styles.address}>
            - 76 Vinh Hưng, Huế | 0134 841 816
          </Typography>
          <Typography className={styles.address}>
            - 72 Bà Rịa, Vũng Tàu | 0786170902
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LocationBanner;
