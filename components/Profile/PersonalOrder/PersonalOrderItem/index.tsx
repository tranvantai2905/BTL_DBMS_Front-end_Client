import { getOrderById } from "@/pages/api";
import { Grid, Stack, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalPopup from "../PersonalPopup";

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
  order: OrderData;
}

const PersonalOrderItem: React.FC<Props> = ({ order }) => {
  const [listProduct, setListProduct] = useState([]);

  const fetchData = async () => {
    const response = await getOrderById(order?.orderId);
    setListProduct(response?.data.data.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Grid container padding="25px" borderBottom="0.5px solid #444" p="20px">
        <Grid item xs={6} sm={4}>
          <Stack flexDirection="row">
            <Typography
              fontSize="0.9rem"
              fontWeight="100"
              lineHeight="1.75rem"
              color="#444"
            >
              {order?.orderId}
            </Typography>
          </Stack>
        </Grid>

        <Grid
          item
          sx={{
            marginLeft: { xs: "37%", sm: "0px" },
            display: { xs: "none", sm: "block" },
          }}
          xs={12}
          sm={4}
        >
          <Typography fontSize="0.9rem" fontWeight="400">
            {order?.status}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Stack flexDirection="row" alignItems="center">
            <PersonalPopup listProduct={listProduct} order={order} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalOrderItem;
