import React from "react";
import { NavLink } from "react-router-dom";

export const NavBarBrand = () => {
  return (
    <div className="nav-bar__brand">
      <NavLink to="/">
        <img
          className="nav-bar__logo"
          src="https://res.cloudinary.com/dcvtrregd/image/upload/v1716405554/cdphotos/photoshand/hfj9b64rcu5xnbegk9ky.jpg"
          alt="Auth0 shield logo"
          width="78"
          height="78"
        />
      </NavLink>
    </div>
  );
};
