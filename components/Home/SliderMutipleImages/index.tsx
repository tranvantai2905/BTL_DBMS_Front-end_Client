import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import styles from "./styles.module.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardImage from "../PromotionSlide/CardImage";

interface Product {
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
}

interface Props {
  products?: Product[];
  numberSlideToShow: number;
  numberSlideToScroll: number;
}

const SliderMutipleImages: React.FC<Props> = ({
  products,
  numberSlideToShow = 2,
  numberSlideToScroll = 2,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const settings: Settings = {
    arrows: true,
    infinite: true,
    autoplay: true,
    accessibility: true,
    dots: true,
    dotsClass: `${styles["slick-dots"]}`,
    className: `${styles.slider}`,
    speed: 500,
    slidesToShow: numberSlideToShow,
    slidesToScroll: numberSlideToScroll,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrowSlickNext}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrowSlickBefore}`}
        style={{
          ...style,
          display: "block",
          zIndex: "3",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Slider {...settings} className={styles.container}>
      {products &&
        products.slice(0, 8).map((product, index) => (
          <div key={index} className={styles.item}>
            <CardImage
              src={product.images[0]}
              name={product.name}
              price={
                Math.min(...product.sizes.map((size) => size.price)) + " đ"
              }
            />
          </div>
        ))}
    </Slider>
  );
};

export default SliderMutipleImages;
