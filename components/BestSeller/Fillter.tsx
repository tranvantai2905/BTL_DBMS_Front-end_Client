import { Box, Typography } from "@mui/material";
import Category from "./Category";
import { CategoryTyp } from "@/pages/best-seller";

const Fillter = ({ categories }: { categories: CategoryTyp[] }) => {
  return (
    <Box
      width={{ xs: "100%", md: "25%" }}
      maxWidth={{ md: "305px" }}
      mr="24px"
      paddingLeft={{ md: "10px", lg: "5px" }}
    >
      <Typography
        variant="h3"
        fontSize={{ xs: "1rem", sm: "1rem", md: "1rem" }}
        lineHeight={{ xs: "1rem", sm: "1.5rem", md: "1.75rem" }}
        textTransform="uppercase"
        borderBottom="1px solid #d9d9d9"
        fontWeight={500}
        pb={"15px"}
      >
        Bộ lọc sản phẩm
      </Typography>
      <Box>
        <Category
          title="Danh mục"
          queryName="categories"
          itemList={categories}
        />
      </Box>
    </Box>
  );
};

export default Fillter;
