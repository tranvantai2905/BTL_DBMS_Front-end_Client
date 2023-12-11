import { Stack, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./style.module.css";

const SearchGroup = () => {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/best-seller") {
      setSelected("Bán chạy");
    } else if (router.pathname === "/shop-products") {
      setSelected("Mặc định");
    }
  }, []);

  function handleSortByDefault() {
    let page = router.query.page;
    delete router.query.page;
    if (page)
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          order_by: "asc",
          sort_by: "created_at",
          page: page,
        },
      });
    else
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order_by: "asc", sort_by: "created_at" },
      });
  }
  function handleSortByNewest() {
    let page = router.query.page;
    delete router.query.page;
    if (page)
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          order_by: "desc",
          sort_by: "created_at",
          page: page,
        },
      });
    else
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order_by: "desc", sort_by: "created_at" },
      });
  }
  function handleSortByHot() {
    let page = router.query.page;
    delete router.query.page;
    if (page)
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          order_by: "desc",
          sort_by: "order_count",
          page: page,
        },
      });
    else
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order_by: "desc", sort_by: "order_count" },
      });
  }
  function handleSortLowPrice() {
    let page = router.query.page;
    delete router.query.page;
    if (page)
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          order_by: "asc",
          sort_by: "price",
          page: page,
        },
      });
    else
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order_by: "asc", sort_by: "price" },
      });
  }
  function handleSortHighPrice() {
    let page = router.query.page;
    delete router.query.page;
    if (page)
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          order_by: "desc",
          sort_by: "price",
          page: page,
        },
      });
    else
      router.push({
        pathname: router.pathname,
        query: { ...router.query, order_by: "desc", sort_by: "price" },
      });
  }
  return (
    <Box
      mt={"25px"}
      mb={"25px"}
      display="grid"
      gridTemplateRows={"1fr"}
      gridTemplateColumns={{
        xs: "repeat(3, 1fr)",
        sm: "repeat(4, 1fr)",
        md: "repeat(5, 1fr)",
        lg: "repeat(5, 1fr)",
        xl: "repeat(5, 1fr)",
      }}
      rowGap={{ xs: "5px", sm: "6px", md: "35px" }}
      columnGap={{ xs: "5px", sm: "10px", md: "25px" }}
      justifyContent={"center"}
    >
      {["Mặc định", "Mới nhất", "Giá thấp", "Giá cao"].map((title, idx) => (
        <button
          key={idx}
          className={styles.button}
          style={{
            backgroundColor: selected === title ? "#ad2526" : "white",
            color: selected === title ? "white" : "black",
            borderColor: selected === title ? "#ad2526" : "black",
            opacity: selected === title ? "0.82" : "1",
          }}
          onClick={() => {
            setSelected(title);
            if (title === "Mặc định") {
              handleSortByDefault();
            }
            if (title === "Mới nhất") {
              handleSortByNewest();
            }
            if (title === "Bán chạy") {
              handleSortByHot();
            }
            if (title === "Giá thấp") {
              handleSortLowPrice();
            }
            if (title === "Giá cao") {
              handleSortHighPrice();
            }
          }}
        >
          {title}
        </button>
      ))}
    </Box>
  );
};

export default SearchGroup;
