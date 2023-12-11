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
    </Box>
  );
};

export default RatingSection;
