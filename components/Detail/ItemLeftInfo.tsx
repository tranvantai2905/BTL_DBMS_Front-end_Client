import {
  Box,
  Typography,
  ImageListItem,
  ImageList,
  sliderClasses,
} from "@mui/material";
import { useState } from "react";
const ItemLeftInfo = ({ images }: { images: string[] }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <Box paddingX={{ xs: "10px", md: "0px" }}>
      <Box width={"100%"}>
        <ImageListItem
          sx={{
            width: "100%",
            cursor: "pointer",
          }}
        >
          <img
            src={images[selectedItem]}
            alt={"Room"}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              transition: "opacity .3s ease-out 0s",
            }}
          />
        </ImageListItem>
        <ImageList
          sx={{
            width: "100%",
            marginTop: "18px",
            // display: "flex",
            // justifyContent: "center",
            // flexGrow: "0",
          }}
          cols={4}
          rowHeight={180}
          gap={20}
        >
          {images.map((item, index) => {
            return (
              <ImageListItem
                sx={{
                  border:
                    selectedItem == index ? "1px solid #ad2526" : "transparent",
                  cursor: "pointer",
                  flexGrow: "0",
                }}
                key={index}
                onClick={() => {
                  setSelectedItem(index);
                  scrollToTop();
                }}
              >
                <img
                  src={item}
                  alt={"itemref"}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </Box>
  );
};

export default ItemLeftInfo;
