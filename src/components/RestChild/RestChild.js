import React, { Component } from "react";
import restImg1 from "./regular_1.png";
import restImg2 from "./regular_2.png";
import restImg3 from "./regular_3.png";
import restImg4 from "./regular_4.png";
import restImg45 from "./regular_4_half.png";
import restImg5 from "./regular_5.png";

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
          <span>Restaurant Name: {r.name}</span>
          <br />
          <p>Category : {r.categories[0].title}</p> <br />
          <img className="img" alt="picture" src={r.image_url} />
          <br />
          <div>
            the rating is{" "}
            <b>
              {r.rating <= 1 ? (
                <img src={restImg1} />
              ) : r.rating <= 2 && r.rating > 1 ? (
                <img src={restImg2} />
              ) : r.rating <= 3 && r.rating > 2 ? (
                <img src={restImg3} />
              ) : r.rating <= 4 && r.rating > 3 ? (
                <img src={restImg4} />
              ) : r.rating <= 4.5 && r.rating > 4 ? (
                <img src={restImg45} />
              ) : r.rating <= 5 && r.rating > 4 ? (
                <img src={restImg5} />
              ) : (
                "error"
              )}
            </b>{" "}
            {r.rating}{" "}
          </div>
          {/* <b>{isLoggedIn ? 'currently' : 'not'}</b> */}
          <button onClick={() => this.doAddRestaurant(r)}>
            Add to My List
          </button>
          <button>
            <a href={r.url}> Show on Website </a>
          </button>
        </li>
      );
    });

    return <ul>{restaurantList}</ul>;
  }
}

export default RestChild;
