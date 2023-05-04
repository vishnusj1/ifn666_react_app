import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          {/* <li>
            <Link to="cart">
              <FontAwesomeIcon icon={faCartShopping} className="fa-xl" />
            </Link>
            <div className={`badge ${quantity > 0 ? "active" : "disabled"}`}>
              {quantity}
            </div>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
