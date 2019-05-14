import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import ShowUser from "./components/ShowUser/ShowUser";
import RestaurantsList from "./components/RestaurantList/RestaurantsList";

import NavBar from "./components/NavBar/NavBar";
import * as routes from "./constants/routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }

  doSetCurrentUser = user => {
    this.setState({ currentUser: user });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <table
          className="homeHeader"
          style={{
            backgroundColor: "red",
            display: "block",
            color: "white",
            fontSize: 27,
            paddingLeft: 15
          }}
        >
          <tbody>
            <td>
              <img width="50" src=" ./img/yelp-logo.png" />
            </td>
            <td>restaurants info</td>
          </tbody>
        </table>

        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          placeholder="enter location"
        />
        {this.state.rows}
        <NavBar />
        <Switch>
          <Route exact path={routes.ROOT} render={() => <div>ROOT</div>} />
          <Route
            exact
            path={routes.HOME}
            render={() => <RestaurantsList currentUser={currentUser} />}
          />
          <Route
            exact
            path={`${routes.USERS}/:id`}
            render={() => <ShowUser currentUser={currentUser} />}
          />

          <Route exact path={routes.USERS} render={() => <div>USER</div>} />
          <Route exact path={routes.POSTS} render={() => <div>POST</div>} />
          <Route
            exact
            path={"/login"}
            render={() => (
              <Login
                doSetCurrentUser={this.doSetCurrentUser}
                currentUser={this.state.currentUser}
              />
            )}
          />

          <Route
            exact
            path={routes.LOGIN}
            render={() => (
              <Login
                currentUser={this.state.currentUser}
                doSetCurrentUser={this.doSetCurrentUser}
              />
            )}
          />

          <Route render={() => <div>NOT FOUND</div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
