import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Register.scss";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  // initialise the state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  // handle change event
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  // handle submit

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(()=>{
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const register_form = new FormData()

      for(var key in formData){
        register_form.append(key,formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register",{
        method:"POST",
        body:register_form
    })

    if(response.ok){
      navigate("/login")

    }
      
    } catch (error) {

      console.log("Registration failed",error.message);
      
    }
  };


  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            name="firstName"
            required
          />
          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            name="lastName"
            required
          />
          <input
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            required
          />
          <input
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            onChange={handleChange}
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            required
          />
          {!passwordMatch&&(
            <p style={{color:"red"}}>Password are not match</p>
          )}



          <input
            id="image"
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add Profile Photot" />
            <p>Upload your photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit" disabled={!passwordMatch}>Register</button>
        </form>
        <a href="/login">Already have been account?Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
