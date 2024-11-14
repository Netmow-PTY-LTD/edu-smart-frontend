import { items } from "@/data/data";
import React from "react";
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import Hero from "../../Home/hero";
import HomeBlog from "../../Home/home_blog";
import HomeComparison from "../../Home/home_comparison";
import HomeFacilities from "../../Home/home_facilities";
import HomePricing from "../../Home/home_pricing";
import HomeSports from "../../Home/home_sports";
import HomeTemplates from "../../Home/home_templates";
import HomeTestimonial from "../../Home/home_testimonial";
import HomeFeatures from "./home/HomeFeatures";

const MainHome = () => {
  return (
    <>
      <>
        <Header />
        <Hero />
        <HomeComparison />
        <HomeTemplates items={items} />
        <HomeSports />
        <HomeFeatures />
        <HomeFacilities />
        {/* <HomePricing pricing={""} /> */}
        <HomeBlog />
        {/* <HomeTestimonial testimonials={""} /> */}
        <Footer />
      </>
    </>
  );
};

export default MainHome;
