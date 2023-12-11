import OrderCompleteItem from "@/components/Checkout/OrderCompleteItem";
import Layout from "@/components/Layout";
import {
  Alert,
  AlertColor,
  Box,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOrderById, getProducts } from "../api";
import styles from "./styles.module.css";

export default function Checkout() {
  const router = useRouter();
  const { id } = router.query;
  const [listProduct, setListProduct] = useState([]);
  const [cost, setCost] = useState("");
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("error");
  const [messageAlert, setMessageAlert] = useState("Thiếu thông tin");

  const hanldOpenNoti = () => {
    setOpenNoti(true);
  };

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event | undefined = undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  useEffect(() => {
    setOpenNoti(true);
    setStatusAlert("success");
    setMessageAlert("Đặt hàng thành công");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCloseNoti(undefined, "timeout");
    }, 3000);
    return () => clearTimeout(timer);
  }, [openNoti, handleCloseNoti]);

  const fetchData = async () => {
    if (id) {
      const response = await getOrderById(id);
      setListProduct(response?.data.data.order.productsinorders);
      setCost(response?.data.data.order.cost);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Layout>
        <Box className="container">
          <Typography
            sx={{ paddingBottom: { xs: "1rem", md: "5rem" } }}
            className={styles.title}
          >
            Thanh toán
          </Typography>
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
          {listProduct.length !== 0 &&
            listProduct.map((product: any, index) => (
              <OrderCompleteItem
                key={index}
                id={product.productId}
                size={product.size}
                quantity={product.quantity}
                price={product.price}
              />
            ))}
          <Stack flexDirection="row" justifyContent="flex-end" m="40px 0">
            <Typography
              sx={{ width: { xs: "50%", md: "30%" } }}
              textAlign="center"
              fontSize="1.7rem"
              textTransform="uppercase"
              color="#9f1110"
            >
              Tổng Thanh Toán
            </Typography>
            <Stack width="50%" alignItems="center">
              <Typography fontSize="1.5rem" color="#9f1110">
                {parseInt(cost).toLocaleString()} đ
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <img
                  className="next"
                  src="https://lep.vn/icons/icon-go-back-red.svg"
                />
                <Link href="/best-seller" style={{ textDecoration: "none" }}>
                  <Typography pl="1rem" color="#ad2526;">
                    Tiếp tục mua sắm
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Snackbar
          open={openNoti}
          autoHideDuration={null}
          onClose={handleCloseNoti}
        >
          <Alert
            onClose={handleCloseNoti}
            severity={statusAlert}
            sx={{ width: "100%" }}
          >
            {messageAlert}
          </Alert>
        </Snackbar>
      </Layout>
    </>
  );
}
