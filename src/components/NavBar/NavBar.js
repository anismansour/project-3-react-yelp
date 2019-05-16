import React from "react";
import { NavLink } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./NavBar.css";

const NavBar = ({ currentUser, doLogout }) => {
  console.log("currentUser", currentUser);
  return (
    <div>
      <h5>NAVBAR</h5>
      <NavLink exact activeClassName="selected" to={routes.ROOT}>
        ROOT{" "}
      </NavLink>
      <NavLink to={routes.HOME} activeClassName="selected">
        HOME{" "}
      </NavLink>
      {currentUser && (
        <NavLink
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
        <span>hello {currentUser.username}</span>
      ) : (
        <NavLink to={"/login"} activeClassName="selected">
          login{" "}
        </NavLink>
      )}
    </div>
  );
};

export default NavBar;
