import React from "react";
import NavBar from "../Components/NavBar";
import Categories from "../Components/Categories"
import Slide from "../Components/Slide"
import Listings from "../Components/Listings";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Slide />
      <Categories />
      <Listings />
    </>
  );
};

export default HomePage;
