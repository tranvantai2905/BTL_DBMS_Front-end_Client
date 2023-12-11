import { Box, Typography } from "@mui/material";

const CodeSection = ({ codeNum }: { codeNum: number }) => {
  return (
    <Box display="flex">
      <Typography
        lineHeight={"22px"}
        fontWeight={"300px"}
        whiteSpace={"nowrap"}
        color="#c9c9c9"
        paddingLeft={"16px"}
        textTransform={"uppercase"}
      >
        CODEID: {codeNum}
      </Typography>
    </Box>
  );
};

export default CodeSection;
