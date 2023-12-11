import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// import ProductBox from "./ProductBox";
import SearchGroup from "./SearchGroup";
import SearchLimit from "./SearchLimit";
import { useRouter } from "next/router";
import Title from "./Title";
import { getProducts } from "@/pages/api";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import ProductBox from "./ProductBox";

interface ResultProps {
  title: string;
  setTotal: (value: number) => void;
}

type ProductTyp = {
  sizes: {
    sizeName: string;
    quantity: number;
    productId: string;
    price: number;
  }[];
  productId: string;
  createdAt: string;
  name: string;
  description: string;
  deleted: number;
  images: string[];
};

const Result = ({ title, setTotal }: ResultProps) => {
  const CustomLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <Link href={href}>
      <a className="custom-link">{children}</a>
    </Link>
  );

  const router = useRouter();
  const [allProducts, setAllProduct] = useState<ProductTyp[]>([]);

  const fetchData = async (query: any) => {
    await getProducts(query)
      .then((res) => {
        setAllProduct(res?.data.data.products);
        let limit;
        if (router.query.limit && typeof router.query.limit == "string")
          limit = parseInt(router.query.limit);
        else limit = 24;
        setTotal(Math.floor(res?.data.count / limit) + 1);
        return res;
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData(router.query);
  }, [router.query]);
  return (
    <>
      <Title title={title} />
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <SearchGroup />
        <SearchLimit />
      </Stack>
      <Grid container mt={"25px"} mb={"25px"} width="100%">
        {allProducts && allProducts.length !== 0 ? (
          allProducts.map((product, index) => {
            return (
              <Grid key={index} item xs={12} sm={4} md={3}>
                <Link
                  key={index}
                  href={`${product.productId}`}
                  className="link"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ProductBox
                    image={product.images[0]}
                    name={product.name}
                    price={Math.min(...product.sizes.map((size) => size.price))}
                  />
                </Link>
              </Grid>
            );
          })
        ) : (
          <Stack justifyContent="center" alignItems="center" width="100%">
            <img
              height="130px"
              alt="img"
              src="https://lep.vn/images/bg-empty-search.png"
            />
            <Typography
              fontWeight={600}
              fontSize="1.2rem"
              textTransform="uppercase"
            >
              Không tìm thấy
            </Typography>
            <Typography color="#444" fontSize="1rem">
              Vui lòng thử lại với sản phẩm khác.
            </Typography>
          </Stack>
        )}
      </Grid>
    </>
  );
};

export default Result;
