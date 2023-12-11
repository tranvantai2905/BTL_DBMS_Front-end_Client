import {
  Box,
  Typography,
  ImageListItem,
  ImageList,
  sliderClasses,
  Stack,
  Rating,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { StyledRating } from "./RatingBox";

const RatingSection = ({
  num,
  point,
}: {
  num: string;
  point: number | null;
}) => {
  return (
    <Box display="flex">
      <StyledRating name="read-only" value={point} readOnly />
      <Typography
        lineHeight={"22px"}
        fontWeight={"300px"}
        whiteSpace={"nowrap"}
        color="#c9c9c9"
        paddingLeft={"16px"}
      >
        {num} reviews
      </Typography>
    </Box>
  );
};

export default RatingSection;
