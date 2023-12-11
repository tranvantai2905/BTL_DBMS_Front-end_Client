import {
  Grid,
  Stack,
  Typography,
  Box,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import UserInfo from "../UserInfo";
import { addtoCart, createAnOrder, myCart, removeFromCart } from "@/pages/api";
import { formatNumber } from "@/components/Detail/SizeSection";
import { useRouter } from "next/router";
import { AuthDialog } from "@/components/Home/Popup";
const OrderItem = () => {
  const [orderId, setOrderId] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");

  type CartItem = {
    cartId: number;
    image: string;
    name: string;
    productId: number;
    quantity: number;
    size: string;
    time: string;
    price: number;
    userId: number;
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

  const [carts, setCart] = useState<CartItem[]>([
    {
      cartId: 0,
      image: "",
      name: "",
      productId: 0,
      quantity: 0,
      size: "",
      time: "",
      price: 0,
      userId: 0,
    },
  ]);
  const [change, setChange] = useState(1);
  useEffect(() => {
    myCart()
      .then((res) => {
        setCart(res?.data.data.items);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [change]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("Cash");
  return (
    <>
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
      {carts?.map((cart, index) => {
        return (
          <Grid
            key={index}
            container
            padding="25px"
            borderBottom="0.5px solid #444"
            p="20px"
          >
            <Grid md={6} xs={12}>
              <Stack flexDirection="row">
                <div className={styles.wrapImage}>
                  <img width="100%" height="100%" src={cart.image} />
                </div>
                <Stack ml="30px">
                  <Typography
                    fontSize={{ xs: "1rem", md: "1.25rem" }}
                    fontWeight="100"
                    lineHeight="1.75rem"
                    color="#444"
                    marginBottom="12px"
                  >
                    {cart.name}
                  </Typography>
                  <Typography fontSize="1.1rem" fontWeight="400">
                    Size {cart.size}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid sx={{ marginLeft: { xs: "20%", md: "0px" } }} xs={12} md={2}>
              <Typography fontSize="1.1rem" fontWeight="400">
                {formatNumber(cart.price)}
              </Typography>
            </Grid>
            <Grid sx={{ marginLeft: { xs: "37%", md: "0px" } }} xs={12} md={2}>
              <Stack flexDirection="row" alignItems="center">
                <button
                  onClick={() => {
                    addtoCart({
                      productId: cart.productId,
                      size: cart.size,
                      quantity: cart.quantity - 1,
                    })
                      .then((res) => {
                        setChange(change + 1);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                  className={styles.buttonDecreaseQuantity}
                >
                  -
                </button>
                <Typography fontSize="1.1rem" fontWeight="400">
                  {cart.quantity}
                </Typography>
                <button
                  onClick={() =>
                    addtoCart({
                      productId: cart.productId,
                      size: cart.size,
                      quantity: cart.quantity + 1,
                    })
                      .then((res) => {
                        setChange(change + 1);
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }
                  className={styles.buttonIncreaseQuantity}
                >
                  +
                </button>
              </Stack>
            </Grid>
            <Grid
              sx={{
                marginLeft: { xs: "37%", md: "0px" },
                display: { xs: "none", md: "block" },
              }}
              xs={12}
              md={2}
            >
              <Stack flexDirection="row" alignItems="center">
                <Typography fontSize="1.1rem" fontWeight="400" color="#9f1110">
                  {formatNumber(cart.quantity * cart.price)}
                </Typography>
                <button
                  className={styles.buttonErase}
                  onClick={() => {
                    removeFromCart(cart.cartId)
                      .then((res) => {
                        setChange(change + 1);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Xóa
                </button>
              </Stack>
            </Grid>
          </Grid>
        );
      })}

      <Stack
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="flex-end"
        m="40px 0"
        gap={5}
      >
        <UserInfo
          address={address}
          setAddress={setAddress}
          phone={phone}
          setPhone={setPhone}
          payment={payment}
          setPayment={setPayment}
          note={note}
          setNote={setNote}
        />
        <Typography
          sx={{ width: { xs: "100%", md: "30%" } }}
          textAlign="center"
          fontSize="1.7rem"
          textTransform="uppercase"
          color="#9f1110"
        >
          Tổng Thanh Toán
        </Typography>

        <Stack width="50%" alignItems="center">
          <Typography fontSize="1.5rem" color="#9f1110">
            {carts &&
              formatNumber(
                carts.reduce((accumulator, currentItem) => {
                  const itemCost = currentItem.price * currentItem.quantity;
                  return accumulator + itemCost;
                }, 0)
              )}
            đ
          </Typography>
          <button
            className={styles.buttonConfirm}
            onClick={() => {
              createAnOrder({
                phone: phone,
                note: note,
                address: address,
                paymentMethod: payment,
                products: carts,
              })
                .then((res) => {
                  setChange(change + 1);
                  const query = { id: res?.data.orderId };
                  if (payment == "Momo Pay") {
                    router.push({
                      pathname: `${process.env.PAYMENT_URL}/${res?.data.orderId}`,
                    });
                  } else {
                    router.push({
                      pathname: "/payment",
                      query,
                    });
                  }
                })
                .catch((error) => {
                  setStatusAlert("error");
                  setMessageAlert(error.response?.data.message);
                  setOpenNoti(true);
                  setChange(change + 1);
                });
            }}
          >
            Đặt hàng
          </button>
        </Stack>
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
      </Stack>
    </>
  );
};

export default OrderItem;
