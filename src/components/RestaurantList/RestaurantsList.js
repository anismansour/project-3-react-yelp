import React, { Component } from "react";
import RestChild from "../RestChild/RestChild";
import "./restaurants.css";

class RestaurantsList extends Component {
  state = {
    restaurants: [],
    time: String,
    location: String
  };

  componentDidMount() {
    this.getRestaurants().then(res => this.setState({ restaurants: res.data }));
  }

  getRestaurants = async () => {
    try {
      const response = await fetch("/api/v1");
      const restaurantParsed = await response.json();
      return restaurantParsed;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
  render() {
    const { restaurants } = this.state;
    return (
      <div>
        <RestChild
          restaurants={restaurants}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default RestaurantsList;
