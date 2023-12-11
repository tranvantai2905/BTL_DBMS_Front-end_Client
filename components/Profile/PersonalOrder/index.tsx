import ReloadContext from "@/contexts/ReloadContext";
import { getMyOrders } from "@/pages/api";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import PersonalOrderItem from "./PersonalOrderItem";
import styles from "./styles.module.css";

interface Props {}

const PersonalOrder: React.FC<Props> = () => {
  const [activeStatus, setActiveStatus] = useState("Pending");
  const [orderData, setOrderData] = useState([]);
  const { reload, setReload } = useContext(ReloadContext);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const handleStatusClick = (status: string) => {
    setActiveStatus(status);
  };

  const fetchData = async () => {
    const response = await getMyOrders(activeStatus, limit, page);
    setOrderData(response?.data.data.orders);
    setTotal(response?.data.data.count);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    setPage(value);
    setReload(!reload);
  };

  useEffect(() => {
    fetchData();
  }, [activeStatus, reload]);
  return (
    <Stack
      sx={{
        width: { xs: "100%", md: "70%" },
        marginLeft: { xs: "0", md: "100px" },
      }}
      alignItems="center"
    >
      <Typography
        sx={{ mt: { xs: "30px", md: "0" } }}
        mb="32px"
        textTransform="uppercase"
        fontSize="1.5rem"
      >
        Lịch sử mua hàng
      </Typography>
      <Stack
        borderBottom="1px solid #d9d9d9"
        width="100%"
        flexDirection="row"
        overflow="scroll"
      >
        <Typography
          className={`${styles.status} ${
            activeStatus === "Pending" ? `${styles.red}` : ""
          }`}
          onClick={() => handleStatusClick("Pending")}
        >
          Pending
        </Typography>
        <Typography
          className={`${styles.status} ${
            activeStatus === "Accepted" ? `${styles.red}` : ""
          }`}
          onClick={() => handleStatusClick("Accepted")}
        >
          Accepted
        </Typography>
        <Typography
          className={`${styles.status} ${
            activeStatus === "Shipping" ? `${styles.red}` : ""
          }`}
          onClick={() => handleStatusClick("Shipping")}
        >
          Shipping
        </Typography>
        <Typography
          className={`${styles.status} ${
            activeStatus === "Done" ? `${styles.red}` : ""
          }`}
          onClick={() => handleStatusClick("Done")}
        >
          Done
        </Typography>
        <Typography
          className={`${styles.status} ${
            activeStatus === "All" ? `${styles.red}` : ""
          }`}
          onClick={() => handleStatusClick("All")}
        >
          All
        </Typography>
      </Stack>

      {orderData.length !== 0 ? (
        <Grid
          container
          borderBottom="0.5px solid #444"
          p="20px"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item className={styles.textHeader} xs={6} sm={4}>
            Mã đơn hàng
          </Grid>
          <Grid
            sx={{ display: { xs: "none", sm: "block" } }}
            className={styles.textHeader}
            xs={4}
            item
          >
            Trạng thái
          </Grid>
          <Grid className={styles.textHeader} xs={6} sm={4} item>
            Thao tác
          </Grid>
        </Grid>
      ) : (
        <Stack alignItems="center">
          <Box m="20px 0">
            <img src="https://lep.vn/icons/ic-package.svg" />
          </Box>
          <Typography mb="20px" color="#bcbcbc" textTransform="uppercase">
            Không tìm thấy đơn hàng
          </Typography>
        </Stack>
      )}

      {orderData.length !== 0 &&
        orderData?.map((order, index) => (
          <PersonalOrderItem key={index} order={order} />
        ))}

      <Stack m="20px 0" width="100%" alignItems="center">
        <Pagination
          count={Math.ceil(total / limit)}
          onChange={handlePageChange}
        />
      </Stack>
    </Stack>
  );
};

export default PersonalOrder;
