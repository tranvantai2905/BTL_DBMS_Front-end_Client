import {
  Box,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { Dispatch, SetStateAction, useState } from "react";
import { AuthDialog, InfoDialog } from "../Home/Popup";
import { addtoCart } from "@/pages/api";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
const ItemAction = ({
  productId,
  selectedItem,
  sizes,
}: {
  productId: number;
  selectedItem: number;
  sizes: {
    sizeName: string;
    quantity: number;
    productId: number;
    price: number;
  }[];
}) => {
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");
  let needPush = false;
  const handleCloseNoti = (
    event: React.SyntheticEvent | Event | undefined = undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };
  const hasAvailableQuantity = sizes.some(
    (element) => Number(element.quantity) > 0
  );
  const [open, setOpen] = useState(false);
  const [iOpen, setIOpen] = useState(false);
  const handleClick = async () => {
    if (localStorage.getItem("user")) {
      // có dữ liệu người dùng được lưu trữ trong localStorage
      await addtoCart({
        productId: productId,
        size: sizes[selectedItem].sizeName,
        quantity: 1,
      })
        .then((response?: AxiosResponse<CartResponse>) => {
          if (response) {
            setStatusAlert("success");
            setMessageAlert(response?.data.message);
            setOpenNoti(true);
            needPush = true;
          }
        })
        .catch((error) => {
          console.error(error);
          setStatusAlert("error");
          console.log(error, "ddd");
          setMessageAlert(error.response?.data.message);
          setOpenNoti(true);
          needPush = false;
        });
    } else {
      setOpen(true);
    }
  };
  const router = useRouter();
  const handleInfo = () => {
    setIOpen(true);
  };
  return (
    <Stack
      direction={"row"}
      justifyContent="center"
      alignItems="center"
      gap={"20px"}
      width={"100%"}
      marginLeft={{ xs: "-40.5px", md: "0px" }}
    >
      <AuthDialog open={open} setOpen={setOpen} />
      <InfoDialog open={iOpen} setOpen={setIOpen} />
      {hasAvailableQuantity && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
          sx={{
            minWidth: "40.5%",
            height: "73px",
            color: "black",
            border: "1px solid black",
            width: "fit-content",
            fontSize: { xs: "10px", md: "14px" },
            "&:hover": {
              opacity: "0.8",
              border: "1px solid black",
            },
          }}
          onClick={() => {
            handleClick();
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      )}
      {!hasAvailableQuantity && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<RemoveShoppingCartIcon />}
          sx={{
            fontSize: { xs: "10px", md: "14px" },
            minWidth: "40.5%",
            height: "73px",
            color: "black",
            border: "1px solid black",
            width: "fit-content",
            "&:hover": {
              opacity: "0.8",
              background: "#ad2526",
              color: "white",
              border: "1px solid transparent",
            },
          }}
        >
          Tạm hết hàng
        </Button>
      )}
      {!hasAvailableQuantity && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<BusinessCenterIcon />}
          sx={{
            fontSize: { xs: "10px", md: "14px" },
            minWidth: "40.5%",
            height: "73px",
            color: "black",
            border: "1px solid black",
            width: "fit-content",
            "&:hover": {
              opacity: "0.8",
              background: "#ad2526",
              color: "white",
              border: "1px solid transparent",
            },
          }}
          onClick={() => {
            handleInfo();
          }}
        >
          Thông báo khi có hàng
        </Button>
      )}
      {hasAvailableQuantity && (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<LocalAtmIcon />}
          sx={{
            fontSize: { xs: "10px", md: "14px" },
            minWidth: "40.5%",
            height: "73px",
            color: "white",
            border: "1px solid transparent",
            width: "fit-content",
            background: "#ad2526",
            "&:hover": {
              opacity: "0.8",
              background: "#ad2526",
              color: "white",
              border: "1px solid transparent",
            },
          }}
          onClick={async () => {
            await handleClick();
            if (needPush) router.push("/checkout");
          }}
        >
          Mua ngay
        </Button>
      )}
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
  );
};

export default ItemAction;

interface CartResponse {
  status: number;
  message: string;
}
