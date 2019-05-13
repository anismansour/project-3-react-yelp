import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import RestaurantsList from "./components/RestaurantList/RestaurantsList";
//import yelp from "yelp-fusion";

import NavBar from "./components/NavBar/NavBar";
import * as routes from "./constants/routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const restaurants = [
      {
        id: 0,
        restaurantImage:
          "https://s3-media3.fl.yelpcdn.com/bphoto/E-ygMSaXJk5HYzh2_8_xhg/348s.jpg",
        name: "taco",
        description: " restaurant description "
      },
      {
        id: 1,
        restaurantImage:
          "https://s3-media2.fl.yelpcdn.com/bphoto/uIoO6R18-4QWa3Lmf4uuNA/o.jpg",
        name: "fish",
        description: " restaurant description 2 "
      },
      {
        id: 2,
        restaurantImage:
          "https://s3-media3.fl.yelpcdn.com/bphoto/E-ygMSaXJk5HYzh2_8_xhg/348s.jpg",
        name: "taco2",
        description: " restaurant description3 "
      }
    ];

    let restaurantLists = [];

    restaurants.forEach(restaurant => {
      console.log(restaurant.id);
      console.log(restaurant.name);
      const restaurantList = <RestaurantsList restaurant={restaurant} />;

      restaurantLists.push(restaurantList);
    });
    this.state = { rows: restaurantLists };
  }

  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path={routes.ROOT} render={() => <div>ROOT</div>} />
          {/* <Route exact path={routes.HOME} render={() => <RestaurantsList />} /> */}

          <Route exact path={routes.USERS} render={() => <div>USER</div>} />
          <Route exact path={routes.POSTS} render={() => <div>POST</div>} />
          <Route exact path={"/login"} render={() => <Login />} />

          <Route render={() => <div>NOT FOUND</div>} />
        </Switch>

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
              <img alt="yelp-logo" width="50" src="yelp-logo.png" />
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
      </div>
    );
  }
}

export default App;
