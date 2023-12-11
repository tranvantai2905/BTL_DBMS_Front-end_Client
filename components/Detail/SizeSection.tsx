import { Box, Typography, Stack, Button, Divider } from "@mui/material";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import Tooltip from "@mui/material/Tooltip";

export const formatNumber = function (number: number) {
  // const parts = number.split(".");
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // return parts.join(".");
  return number;
};

const SizeSection = ({
  selected,
  setSelected,
  sizes,
}: {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  sizes: {
    sizeName: string;
    quantity: number;
    productId: number;
    price: number;
  }[];
}) => {
  const sizeList = useMemo(() => sizes.map((size) => size.sizeName), [sizes]);
  console.log("check sizes: ", sizes);
  return (
    <Box>
      <Typography
        color={"#ad2526"}
        fontSize={{ xs: "1rem", sm: "1.125rem", md: "1.5rem" }}
        lineHeight={{ xs: "1.75rem", sm: "2rem" }}
        letterSpacing={".1rem"}
        fontWeight={500}
        margin={"18px"}
      >
        {formatNumber(sizes[selected].price)} đ
      </Typography>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderLeft: "0.05px solid black" }}
      ></Divider>
      <Box
        display="flex"
        m={"24px 0px"}
        gap={2}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Typography
          lineHeight={"22px"}
          fontWeight={"500px"}
          whiteSpace={"nowrap"}
          color="fff"
          paddingLeft={"16px"}
          textTransform={"uppercase"}
          fontSize={"1.125rem"}
        >
          size
        </Typography>
        <Stack display="flex" justifyContent={"center"}>
          <Stack
            gap={"24px"}
            paddingBottom={"24px"}
            direction={{ xs: "row", md: "row" }}
            alignSelf={"center"}
          >
            <Tooltip
              title={`Còn ${
                sizes.filter((element) => element.sizeName === "S")[0]?.quantity
              } sản phẩm`}
              arrow
              sx={{
                cursor: "pointer",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  opacity:
                    sizeList.includes("S") ||
                    sizes.filter((element) => element.sizeName === "S")[0]
                      ?.quantity == 0
                      ? 1
                      : 0.1,
                  pointerEvents:
                    !sizeList.includes("S") ||
                    sizes.filter((element) => element.sizeName === "S")[0]
                      ?.quantity == 0
                      ? "none"
                      : "pointer",
                  cursor: !sizeList.includes("S") ? "not-allowed" : "default",
                  color: sizes[selected].sizeName == "S" ? "white" : "black",
                  background:
                    sizes[selected].sizeName == "S" ? "#ad2526" : "white",
                  border: "1px solid black",
                  width: "fit-content",
                  "&:hover": {
                    background: "#ad2526",
                    color: "white",
                    border: "transparent",
                  },
                }}
                onClick={() =>
                  setSelected(
                    sizes.findIndex((element) => element.sizeName === "S")
                  )
                }
              >
                S
              </Button>
            </Tooltip>
            <Tooltip
              title={`Còn ${
                sizes.filter((element) => element.sizeName === "M")[0]?.quantity
              } sản phẩm`}
              arrow
            >
              <Button
                variant="outlined"
                sx={{
                  opacity:
                    sizeList.includes("M") ||
                    sizes.filter((element) => element.sizeName === "L")[0]
                      ?.quantity == 0
                      ? 1
                      : 0.1,
                  cursor:
                    !sizeList.includes("M") ||
                    sizes.filter((element) => element.sizeName === "M")[0]
                      ?.quantity == 0
                      ? "not-allowed"
                      : "pointer",
                  pointerEvents: !sizeList.includes("M") ? "none" : "pointer",
                  border: "1px solid black",
                  width: "fit-content",
                  "&:hover": {
                    background: "#ad2526",
                    color: "white",
                    border: "transparent",
                  },
                  color: sizes[selected].sizeName == "M" ? "white" : "black",
                  background:
                    sizes[selected].sizeName == "M" ? "#ad2526" : "white",
                }}
                onClick={() =>
                  setSelected(
                    sizes.findIndex((element) => element.sizeName === "M")
                  )
                }
              >
                M
              </Button>
            </Tooltip>
            <Tooltip
              title={`Còn ${
                sizes.filter((element) => element.sizeName === "L")[0]?.quantity
              } sản phẩm`}
              arrow
            >
              <Button
                variant="outlined"
                sx={{
                  opacity:
                    sizeList.includes("L") ||
                    sizes.filter((element) => element.sizeName === "L")[0]
                      ?.quantity == 0
                      ? 1
                      : 0.1,
                  cursor:
                    !sizeList.includes("L") ||
                    sizes.filter((element) => element.sizeName === "L")[0]
                      ?.quantity == 0
                      ? "not-allowed"
                      : "pointer",
                  pointerEvents: !sizeList.includes("L") ? "none" : "pointer",
                  border: "1px solid black",
                  width: "fit-content",
                  "&:hover": {
                    background: "#ad2526",
                    color: "white",
                    border: "transparent",
                  },
                  color: sizes[selected].sizeName == "L" ? "white" : "black",
                  background:
                    sizes[selected].sizeName == "L" ? "#ad2526" : "white",
                }}
                onClick={() =>
                  setSelected(
                    sizes.findIndex((element) => element.sizeName === "L")
                  )
                }
              >
                L
              </Button>
            </Tooltip>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<CheckroomIcon />}
            sx={{
              color: "black",
              border: "1px solid black",
              width: "fit-content",
              alignSelf: "center",
              "&:hover": {
                background: "#ad2526",
                color: "white",
                border: "1px solid transparent",
              },
            }}
          >
            SIZECHART
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SizeSection;
