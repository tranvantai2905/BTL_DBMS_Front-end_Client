import {
  Box,
  Typography,
  ImageListItem,
  ImageList,
  sliderClasses,
  Stack,
  Rating,
  Divider,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import LikeSection from "./LikeSection";
import RatingSection from "./RatingSection";
import CodeSection from "./CodeSection";
import SizeSection from "./SizeSection";
import MoreInfo from "./MoreInfo";
import ItemAction from "./ItemAction";
const ItemRightInfo = ({
  name,
  numberRating,
  ratingPoint,
  sizes,
  productId,
}: {
  productId: number;
  name: string;
  numberRating: string;
  ratingPoint: number | null;
  sizes: {
    sizeName: string;
    quantity: number;
    productId: number;
    price: number;
  }[];
}) => {
  const [selectedItem, setSelectedItem] = useState(0);
  return (
    <Box
      width="100%"
      paddingLeft={{ xs: "25px", md: "100px" }}
      marginTop={"10px"}
    >
      <Typography
        variant="h1"
        fontSize={{ xs: "1rem", sm: "1rem", md: "1.5rem" }}
        lineHeight={{ xs: "1rem", sm: "1.5rem", md: "1.75rem" }}
        fontWeight={400}
        paddingY={"30px"}
      >
        {name}
      </Typography>
      <Stack
        direction={"row"}
        gap={"20px"}
        flexDirection={{ xs: "row", md: "row" }}
      >
        <RatingSection num={numberRating} point={ratingPoint} />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderLeft: "0.05px solid black" }}
        ></Divider>
        <CodeSection codeNum={productId} />
      </Stack>

      <SizeSection
        selected={selectedItem}
        setSelected={setSelectedItem}
        sizes={sizes}
      />
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderLeft: "0.05px solid black" }}
      ></Divider>
      <MoreInfo />
      <ItemAction
        productId={productId}
        selectedItem={selectedItem}
        sizes={sizes}
      />
      <Box
        position={"fixed"}
        width={"100%"}
        left={0}
        bottom={0}
        paddingTop={"5px"}
        paddingBottom={"15px"}
        paddingX={{ xs: "5px", sm: "20px", md: "10px" }}
        zIndex={1}
        sx={{
          backgroundColor: "white",
        }}
      >
        <ItemAction
          productId={productId}
          selectedItem={selectedItem}
          sizes={sizes}
        />
      </Box>
    </Box>
  );
};

export default ItemRightInfo;
