import PromotionSlide from "@/components/Home/PromotionSlide";
import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import SliderImage from "../components/Home/SliderImage";
import { Box } from "@mui/material";
import CollectionSlide from "@/components/Home/CollectionSlide";
import LocationBanner from "@/components/Home/LocationBanner";

export default function Home() {
  return (
    <>
      <Layout>
        <SliderImage />
        <PromotionSlide title="Best Seller" />
        <CollectionSlide />
        <PromotionSlide title="Sản phẩm" />
        <LocationBanner />
      </Layout>
    </>
  );
}
