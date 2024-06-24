import React from "react";
import "../styles/ListingCard.scss";
import { ArrowForwardIos,ArrowBackIosNew } from "@mui/icons-material";
import {useState} from "react"

const ListingCard = ({
  listingId,
  creator,
  listingPhotoPaths,
  city,
  province,
  country,
  category,
  type,
  price,
}) => {


  // slider for images
  const [currentIndex,setCurrentIndex] = useState(0)

  const goToPrevSlide = ()=>{
    setCurrentIndex((prevIndex)=>(prevIndex -1 + listingPhotoPaths.length)% listingPhotoPaths.length)
  }

  const goToNextSlide = () =>{
    setCurrentIndex((prevIndex)=>(prevIndex+1)% listingPhotoPaths.length)
  }

  return (
    <div className="listing-card">
      <div className="slider-container">
        <div className="slider" style={{transform :`translateX(-${currentIndex * 100}%)`}}>
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide">
              <img src={`http://localhost:3001/${photo.replace("Public"," ")}`} alt={`photo ${index +1}`} />
              <div className="prev-button" onClick={(e)=>{goToPrevSlide(e)}}>
                <ArrowBackIosNew sx={{fontSize:"15px"}} />
              </div>
              
              
              <div className="next-button" onClick={(e)=>{goToNextSlide(e)}}>
                <ArrowForwardIos sx={{fontSize:"15px"}} />
              </div>
            </div>
          ))}
        </div>

      </div>

      <h3>{city} ,{province} ,{country}</h3>
      <p>{category}</p>
      <p>{type}</p>
      <p><span>${price}</span> pre night</p>

    </div>
  );
};

export default ListingCard;
