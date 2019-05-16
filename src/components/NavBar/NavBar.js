import React from "react";
import { NavLink } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./NavBar.css";
import "materialize-css/dist/css/materialize.min.css";

const NavBar = ({ currentUser, doLogout }) => {
  console.log("currentUser", currentUser);
  return (
    <nav>
      <div className="nav-wrapper">
        {/* <img className="brand-logo center" width="50" src=" ./yelp-logo.png" /> */}
        <NavLink
          className="brand-logo right tab"
          to={routes.HOME}
          activeClassName="selected"
        >
          HOME{" "}
        </NavLink>
        {currentUser && (
          <NavLink
            className="brand-logo center tab"
            exact
            to={`${routes.USERS}/${currentUser._id}`}
            activeClassName="selected"
          >
            {currentUser.username} Profile{" "}
          </NavLink>
        )}
        {currentUser ? (
          <span>
            <button onClick={doLogout}>logout</button>
          </span>
        ) : (
          [
            <NavLink key={1} to={routes.REGISTER} activeClassName="selected">
              Register{"   "}
            </NavLink>
          ]
        )}

        {currentUser ? (
          <span> {currentUser.username}</span>
        ) : (
          <NavLink to={"/login"} activeClassName="selected">
            login{" "}
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
