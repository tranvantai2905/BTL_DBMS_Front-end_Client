import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { formatNumber } from "../Detail/SizeSection";

interface ProductBoxProps {
  image: string;
  name: string;
  price: string;
}
const ProductBox = ({ image, name, price }: ProductBoxProps) => {
  return (
    <Box width="90%" mb="20px">
      <Box
        overflow="hidden"
        width="100%"
        height={{ xs: "50%", sm: "60%", md: "82%" }}
        display="flex"
        justifyContent="center"
      >
        <Box
          width={{ xs: "250px", sm: "400px", md: "100%" }}
          height={{ xs: "400px", sm: "500px", md: "330px" }}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "scale(1.3)",
            },
          }}
          style={{}}
        ></Box>
      </Box>
      <Box mt="13px" width="100%">
        <Typography
          variant="h4"
          fontSize="1.2rem"
          lineHeight={"20px"}
          textOverflow={"ellipsis"}
          fontFamily="Open Sans"
          fontWeight="300"
          textAlign={{ xs: "center", md: "start" }}
          sx={{
            marginBlock: { xs: "3px", sm: "5px", md: "10px" },
          }}
        >
          {name}
        </Typography>
        <Box
          component="p"
          fontSize="1rem"
          lineHeight={"20px"}
          fontWeight={"400"}
          textAlign={{ xs: "center", md: "start" }}
        >
          {formatNumber(price)}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductBox;
