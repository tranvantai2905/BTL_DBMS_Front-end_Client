import {
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Rating from "@mui/material/Rating";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "@mui/material/styles";
import { addRating, addtoCart } from "@/pages/api";
import { AuthDialog } from "../Home/Popup";
import { UserContext } from "@/pages/[productId]";

export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#9f1110",
  },
  "& .MuiRating-iconHover": {
    color: "#9f1110",
  },
});

const RatingBox = ({
  productId,
  setChange,
}: {
  productId: number;
  setChange: Dispatch<SetStateAction<number>>;
}) => {
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  const [statusAlert, setStatusAlert] = useState<AlertColor>("success");
  const [messageAlert, setMessageAlert] = useState("Cập nhật thành công");

  const { userChange } = useContext(UserContext);
  const [name, setName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setName(userData?.data?.name);
    }
  }, [userChange]);
  const handleCloseNoti = (
    event: React.SyntheticEvent | Event | undefined = undefined,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNoti(false);
  };

  const [ratingPoint, setRatingPoint] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null!);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={10}
      mt={3}
      marginX={3}
      width={"90%"}
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        variant="h6"
        fontWeight={400}
        lineHeight={"1.75rem"}
        fontSize={{ xs: "0.75rem", md: "1.125rem" }}
        color="#444"
      >
        ĐÁNH GIÁ MỨC ĐỘ HÀI LÒNG CỦA BẠN VỀ SẢN PHẨM
      </Typography>
      <Stack direction={"row"} justifyContent="space-between">
        <Stack width={"50%"} direction={"row"} alignItems={"center"}>
          <AccountCircleOutlinedIcon fontSize={"large"} />
          <Typography
            fontSize={{ xs: "1rem", md: "1.125rem" }}
            lineHeight={{ xs: "1.5rem", md: "1.75rem" }}
            padding="10px"
          >
            {name}
          </Typography>
        </Stack>
        <Divider
          flexItem
          orientation="vertical"
          sx={{ borderLeft: "0.05px solid black" }}
        />
        <Stack
          width={"50%"}
          paddingLeft={"50px"}
          direction={{ xs: "column", md: "row" }}
          gap={{ xs: "10px", md: "100px" }}
        >
          <Typography
            color={"#9f1110"}
            fontSize="1.125rem;"
            lineHeight="1.75rem;"
            fontWeight={700}
          >
            {ratingPoint}/5
          </Typography>
          <StyledRating
            defaultValue={ratingPoint}
            value={ratingPoint}
            max={5}
            onChange={(_event, value) => {
              if (value != null) {
                setRatingPoint(+value);
              } else {
                setRatingPoint(0);
              }
            }}
          />
        </Stack>
      </Stack>
      <TextareaAutosize
        ref={textAreaRef}
        aria-label="minimum height"
        minRows={3}
        placeholder="Viết bình luận về sản phẩm này"
        style={{
          width: "90%",
          padding: "16px 24px",
          fontWeight: "300",
          display: "block",
          border: "1px solid #444",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
        }}
      />
      <Button
        sx={{
          width: "fit-content",
          backgroundColor: "#9f1110",
          marginTop: "-50px",
          "&:hover": {
            backgroundColor: "#9f1110",
            opacity: 0.9,
          },
        }}
        variant="contained"
        onClick={() => {
          if (localStorage.getItem("user")) {
            addRating({
              productId,
              star: ratingPoint,
              comment: textAreaRef.current?.value,
            })
              .then((res) => {
                setStatusAlert("info");
                setMessageAlert(res?.data.message);
                setOpenNoti(true);
                textAreaRef.current.value = "";
                setChange((curr) => curr + 1);
              })
              .catch((err) => {
                console.log({ err });
              });
          } else setOpen(true);
        }}
      >
        Gửi
      </Button>
      <AuthDialog open={open} setOpen={setOpen} />
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
    </Box>
  );
};

export default RatingBox;
