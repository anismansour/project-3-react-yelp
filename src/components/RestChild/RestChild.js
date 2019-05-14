import React, { Component } from "react";

class RestChild extends Component {
  doAddRestaurant = async obj => {
    const { currentUser } = this.props;

    const addRestaurant = await fetch(`/api/v1/${currentUser._id}`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const parsedResponse = await addRestaurant.json();
    console.log(parsedResponse);
  };
  render() {
    const restaurantList = this.props.restaurants.map((r, i) => {
      return (
        <li key={r._id}>
          <span>{r.name}</span>
          <br />
          <img className="img" alt="picture" src={r.image_url} />
          <br />
          {}
          <button onClick={() => this.doAddRestaurant(r)}>
            Add to My List
          </button>
          <button>Show on Website</button>
        </li>
      );
    });

    return <ul>{restaurantList}</ul>;
  }
}

export default RestChild;
