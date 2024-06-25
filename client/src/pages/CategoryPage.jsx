import React, { useState,useEffect } from "react";
import "../styles/List.scss";
import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";


const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  const listings = useSelector((state) => state.listings) || [];
  const dispatch = useDispatch()

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,

        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("fetching listing failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">{category} listing</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
