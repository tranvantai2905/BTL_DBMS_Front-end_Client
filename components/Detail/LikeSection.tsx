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

const LikeSection = ({ likeNum }: { likeNum: number }) => {
  return (
    <Box display="flex">
      <FavoriteIcon />
      <Typography
        lineHeight={"22px"}
        fontWeight={"300px"}
        whiteSpace={"nowrap"}
        color="#c9c9c9"
        paddingLeft={"16px"}
      >
        {likeNum.toString()} loves
      </Typography>
    </Box>
  );
};

export default LikeSection;
