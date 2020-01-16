import React from "react";
import PropTypes from "prop-types";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> 60c17fb07387c0e2dd652e7aa5781d6e31819593

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
<<<<<<< HEAD
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
=======
>>>>>>> 60c17fb07387c0e2dd652e7aa5781d6e31819593
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
