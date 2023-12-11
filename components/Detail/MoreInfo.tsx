import {
  Box,
  Typography,
  ImageListItem,
  ImageList,
  sliderClasses,
  Stack,
  Rating,
} from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Link from "next/link";

const MoreInfo = () => {
  return (
    <Box
      display="flex"
      paddingY={"27px"}
      gap={{ xs: "10px", md: "100px" }}
      flexDirection={{ xs: "column", sm: "row" }}
    >
      <Stack
        width={{ xs: "100%", sm: "75%", md: "40%" }}
        alignItems={"center"}
        paddingRight={"15px"}
        gap={{ xs: "10px", md: "20px" }}
        marginLeft={{ xs: "0px", md: "35px" }}
        flexDirection={{ xs: "row", md: "column" }}
      >
        <AddCardIcon fontSize="large" />
        <Typography
          lineHeight={"1.75rem"}
          fontWeight={"300"}
          color="rgb(68,68,68)"
          textAlign={{ xs: "start", md: "center" }}
          fontSize={{ xs: "15px", md: "18px" }}
        >
          Miễn phí giao hàng cho đơn từ 1.500.000 VND trở lên
        </Typography>
      </Stack>
      <Stack
        width={{ xs: "100%", md: "40%" }}
        alignItems={"center"}
        paddingRight={"15px"}
        gap={{ xs: "10px", md: "20px" }}
        marginLeft={{ xs: "0px", md: "35px" }}
        flexDirection={{ xs: "row", md: "column" }}
      >
        <AutorenewIcon fontSize="large" />
        <Stack alignItems={"center"} justifyContent={"center"}>
          <Typography
            lineHeight={"1.75rem"}
            fontWeight={"300"}
            color="rgb(68,68,68)"
            textAlign={"center"}
            fontSize={{ xs: "15px", md: "18px" }}
          >
            Đổi trả trong 7 ngàys
          </Typography>

          <Link href="/about/return" passHref legacyBehavior>
            <a
              className="link"
              style={{
                color: "#ad2526",
                textDecoration: "none",
                fontSize: "18px",
                lineHeight: "1.75rem",
              }}
            >
              Xem chi tiết
            </a>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MoreInfo;
