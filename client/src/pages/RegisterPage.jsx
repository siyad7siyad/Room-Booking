import React from "react";
import { useState } from "react";
import "../styles/Register.scss";

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

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form">
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

          {formData.profileImage&&(
            <img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{maxWidth:"80px"}} />
          )}





          <button type="submit">Register</button>
        </form>
        <a href="/login">Already have been account?Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
