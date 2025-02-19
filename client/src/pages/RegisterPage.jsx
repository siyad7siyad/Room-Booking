import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  // console.log(formData);
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(()=>{
    setPasswordMatch(formData.password===formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if(formData.password === formData.confirmPassword){
    //   setPasswordMatch(true)
    // }else{
    //   setPasswordMatch(false)
    // }
   
    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      if(response.ok){
         navigate("/login")

      }

    } catch (err) {
      console.log("registration failed",err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            onChange={handleChange}
            value={FormData.email}
            name="email"
            required
          />
          <input
            placeholder="Password"
            onChange={handleChange}
            name="password"
            type="password"
            value={FormData.password}
            required
          />
          <input
            placeholder="Confirm Password"
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            value={FormData.confirmPassword}
            required
          />
          {!passwordMatch&&(
            <p style={{color:"red"}}>Password is not Match</p>
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
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
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
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
