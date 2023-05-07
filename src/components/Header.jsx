import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const email = localStorage.getItem("email");
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  return (
    <header>
      <nav>
      {email? <p>hello, {email}</p>: ''}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stock">Stocks</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {email ? (
            <>
              <li>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
