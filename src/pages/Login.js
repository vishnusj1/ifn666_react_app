import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      console.log(email,password);
      navigate('/')
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError("Please enter your email and password.");
    }
  };

  const handleGoBack = () =>{
    navigate('/')
  }

  return (
    <section className="login-page">
      <div className="login-title">
        <h1>Login</h1>
      </div>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-form-input"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
        <br />
        <input
          type="password"
          className="login-form-input"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <br />
        <div className="buttons">
          <button type="submit" className="login-form-button">
            Log In
          </button>
          <button className="login-form-button go-back"  onClick={handleGoBack}>
            Go back
          </button>
        </div>
        {error && <p className="login-form-error">{error}</p>}
      </form>
    </section>
  );
};

export default Login;
