import React from "react";
import { NavLink } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./NavBar.css";

const NavBar = () => (
  <div>
    <h5>NavBar</h5>
    <NavLink to={routes.HOME} activeClassName="active">
      HOME{" "}
    </NavLink>
    <NavLink to={routes.USERS} activeClassName="active">
      USERS{" "}
    </NavLink>
    <NavLink to={routes.POSTS} activeClassName="active">
      POSTS{" "}
    </NavLink>
    <NavLink exact to={routes.ROOT} activeClassName="active">
      ROOT{" "}
    </NavLink>
  </div>
);

export default NavBar;
