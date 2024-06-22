import React from "react";
import { useState } from "react";
import "../styles/Login.scss"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {

      const response = await fetch("http://localhost:3001/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
      })

      // get data fetching
      const loggedIn = await response.json()
      
    } catch (err) {
      
    }

  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => e.target.value}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => e.target.value}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Dont have an account ?sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;
