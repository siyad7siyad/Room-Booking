import React from "react";
import NavBar from "../Components/NavBar";
import Categories from "../Components/Categories"
import Slide from "../Components/Slide"
import Listings from "../Components/Listings";
import Footer from "../Components/Footer";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  );
};

export default HomePage;
