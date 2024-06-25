import React, { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../Components/Loader";
import NavBar from "../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { setTripList } from "../redux/state";
import ListingCard from "../Components/ListingCard";
import Footer from "../Components/Footer";

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const getTripList = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}/trips`, {
          method: "GET",
        });
        const data = await response.json();
        dispatch(setTripList(data));
        setLoading(false);
      } catch (err) {
        console.log("Fetch triplist failed", err.message);
      }
    };
    getTripList();
  }, [dispatch, userId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <h1 className="title-list">Your Trip List</h1>
      <div className="list">
        {Array.isArray(tripList) && tripList.length > 0 ? (
          tripList.map(
            ({ listingId, hostId, startDate, endDate, totalPrice, booking = true }) => (
              <ListingCard
                key={listingId._id}
                listingId={listingId._id}
                creator={hostId._id}
                startDate={startDate}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking}
              />
            )
          )
        ) : (
          <p>No trips found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripList;
