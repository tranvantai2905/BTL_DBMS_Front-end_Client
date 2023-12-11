import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import PersonalOrderCompleteItem from "../PersonalOrderCompleteItem";
import styles from "./styles.module.css";

interface OrderData {
  address: string;
  cost: number | string; // Depending on how the data is used, the cost can be represented as either a number or a string
  deliveryTime: Date | null;
  note: string;
  orderId: string;
  orderTime: string;
  phone: string;
  status: string;
  userId: string;
}

interface Product {
  productId: string;
  size: string;
  quantity: string;
  price: string;
}

interface Props {
  listProduct?: Product[];
  order: OrderData;
}

const PersonalPopup: React.FC<Props> = ({ listProduct, order }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button onClick={handleOpen} className={styles.button}>
        Chi tiết
      </button>

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle className={styles.wrapForm}>Chi tiết đơn hàng</DialogTitle>
        <DialogContent>
          <Stack>
            <Box>
              <Grid
                container
                borderBottom="0.5px solid #444"
                p="20px"
                justifyContent="center"
                alignItems="center"
              >
                <Grid className={styles.textHeader} xs={6}>
                  Sản phẩm
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Đơn giá
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Số lượng
                </Grid>
                <Grid
                  sx={{ display: { xs: "none", md: "block" } }}
                  className={styles.textHeader}
                  xs={2}
                >
                  Số tiền
                </Grid>
              </Grid>
              {listProduct?.length !== 0 &&
                listProduct?.map((product: any, index) => (
                  <PersonalOrderCompleteItem
                    key={index}
                    id={product.productId}
                    size={product.size}
                    quantity={product.quantity}
                    price={product.price}
                  />
                ))}
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                m="10px 0"
              >
                <Typography
                  sx={{ width: { xs: "50%", md: "30%" } }}
                  textAlign="center"
                  fontSize="1rem"
                  textTransform="uppercase"
                  color="#9f1110"
                >
                  Tổng Thanh Toán
                </Typography>
                <Typography fontSize="1rem" color="#9f1110">
                  {parseInt(order.cost.toString()).toLocaleString()} đ
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <button className={styles.button} onClick={handleClose}>
            Tắt
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PersonalPopup;
