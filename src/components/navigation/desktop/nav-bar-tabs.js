import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { NavBarTab } from "./nav-bar-tab";

export const NavBarTabs = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__tabs">
      <NavBarTab path="/Contact" label="Contact" />
      <NavBarTab path="/public" label="Public" />
      <NavBarTab path="/portfolio" label="Portfólio" />
      {isAuthenticated && (
        <>
          <NavBarTab path="/admin" label="Admin" />
          <NavBarTab path="/contactlist" label="Contact-list" />
        </>
      )}
    </div>
  );
};
