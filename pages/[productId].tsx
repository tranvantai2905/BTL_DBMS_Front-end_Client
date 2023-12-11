import { Box, Divider, Typography } from "@mui/material";
import Layout from "../components/Layout";
import ItemLeftInfo from "@/components/Detail/ItemLeftInfo";
import ItemRightInfo from "@/components/Detail/ItemRightInfo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProduct } from "./api";
import RatingBox from "@/components/Detail/RatingBox";
import CommentBox from "@/components/Detail/CommentBox";
import { createContext } from "react";

type ProductInfoTyp = {
  productId: number;
  name: string;
  description: string;
  createdAt: string;
  deleted: number;
  sizes: {
    sizeName: string;
    quantity: number;
    productId: number;
    price: number;
  }[];
  images: string[];
  averageStar: number | null;
};

type ProductTyp = {
  createdAt: string;
  description: string;
  images: string[];
  maxPrice: string;
  minPrice: string;
  name: string;
  productId: string;
  soldQuantity: string;
};

export const UserContext = createContext({
  userChange: 0,
  handleClick: () => {},
});

const Items = () => {
  const [change, setChange] = useState(0);
  const [userChange, setUserChange] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductInfoTyp>({
    productId: 0,
    name: "",
    description: "",
    createdAt: "",
    deleted: 0,
    sizes: [],
    images: [],
    averageStar: null,
  });

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    console.log("check productId: ", productId);
    const fetchData = async () => {
      if (productId) {
        const res = await getProduct(productId);
        setProductInfo(res?.data.data.product);
      }
    };
    fetchData();
  }, [productId]);

  const handleClick = () => {
    setUserChange(userChange + 1);
  };

  return (
    productInfo.sizes.length !== 0 && (
      <UserContext.Provider value={{ userChange, handleClick }}>
        <Layout>
          <Box
            width="100%"
            mt="85px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              pb="3rem"
              width="80%"
            >
              <Box
                width={{ xs: "100%", sm: "100%", md: "33.333%" }}
                bgcolor={"white"}
              >
                <ItemLeftInfo images={productInfo.images} />
              </Box>
              <Box width="100%">
                <ItemRightInfo
                  productId={productInfo.productId}
                  name={productInfo.name}
                  numberRating={""}
                  ratingPoint={productInfo.averageStar}
                  sizes={productInfo.sizes}
                />
              </Box>
            </Box>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ borderLeft: "0.05px solid black" }}
            ></Divider>
            <CommentBox productId={productInfo.productId} change={change} />
            <Divider
              orientation="horizontal"
              flexItem
              sx={{ borderLeft: "0.05px solid black" }}
            ></Divider>
            <RatingBox
              productId={productInfo.productId}
              setChange={setChange}
            />
          </Box>
        </Layout>
      </UserContext.Provider>
    )
  );
};

export default Items;
