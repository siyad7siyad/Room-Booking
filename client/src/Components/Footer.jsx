import React from "react";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
import "../styles/Footer.scss"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/">
          <img src="/assets/logo.jpg" alt="logo" />
        </a>
      </div>

      <div className="footer_center">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>WishList</li>
          <li>Terms And Condition</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact</h3>
        <div className="footer_right_info">
          <LocalPhone />
          <p>+91 7736711807</p>
        </div>
        <div className="footer_right_info">
          <Email />
          <p>OceanHomes@gmail.com</p>
        </div>
        <div className="footer_right_info">
          <LocationOn />
          <p>Palakkad Kerela</p>
        </div>
        <img src="/assets/payment.png" alt="payment" />
      </div>
    </div>
  );
};

export default Footer;
