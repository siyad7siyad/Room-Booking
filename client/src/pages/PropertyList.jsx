import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Components/NavBar";
import ListingCard from "../Components/ListingCard";
import { useEffect,useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../Components/Loader";

const PropertyList = () => {
  const [loading,setLoading] = useState(true)
  const propertyList = useSelector((state) => state.user.propertyList);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const getPropertyList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${user._id}/properties`,
        {
          method: "GET",
        }
      );
      const data = await response.json()
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("fetch all properties", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? <Loader /> : (
    <>
      <NavBar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
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
    </>
  );
};

export default PropertyList;
