import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "./FirebaseConfig";

function Login() {
  const history = useNavigate();
  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(database, email, password)
      .then((data) => {
        history("/home");
      })
      .catch((error) => {
        console.error("Authentication Error:", error);

        // Set invalidLogin to true for any error
        setInvalidLogin(true);
      });
  };

  return (
    <div className="Login-page">
      <div className="login-cnt">
        <h1>Image gallery</h1>
        <h2>
          Welcome to <strong>Image Gallery</strong>, here you can view images,
          drag and drop them to your preference.
        </h2>
        <p className="login-header">Login</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="login-label" for="email">
            Email
          </label>
          <br></br>
          <div className="login-input-cnt">
            <input
              className="login-input"
              id="email"
              type="email"
              name="email"
            />
          </div>
          <br></br>
          <label className="login-label" for="password">
            Password
          </label>
          <br></br>
          <div className="login-input-cnt">
            <input
              className="login-input"
              id="password"
              type="password"
              name="password"
            />
          </div>
          <br></br>
          <button className="login-btn">Login</button>
        </form>

        {invalidLogin && (
          <p className="error-message">Invalid email or password</p>
        )}
      </div>
    </div>
  );
}

export default Login;
