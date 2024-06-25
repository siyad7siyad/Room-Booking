import React from 'react'
import "../styles/List.scss"
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setListings } from '../redux/state';
import Loader from '../Components/Loader';
import ListingCard from '../Components/ListingCard';
import NavBar from '../Components/NavBar';
import {useState,useEffect} from "react"
import Footer from "../Components/Footer";

const SearchPage = () => {

  const [loading,setLoading] = useState(true)

  const {search} =useParams()
  const listings = useSelector((state)=>state.listings)
  const dispatch = useDispatch()

  const getSearchListings = async()=>{
    try {
      const response = await fetch(`http://localhost:3001/properties/search/${search}`,{
        method:"GET"
      })

      const data = await response.json()
      dispatch(setListings({listing:data}))
      setLoading(false)

    } catch (error) {
      console.log("search error".error.message);
    }
  }

  useEffect(()=>{
    getSearchListings()
  },[search])

  return loading ? <Loader /> : (
    <>
      <NavBar />
      <h1 className="title-list">{search}</h1>
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
}

export default SearchPage
