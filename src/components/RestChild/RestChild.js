import React, { Component } from "react";
import restImg1 from "./regular_1.png";
import restImg2 from "./regular_2.png";
import restImg3 from "./regular_3.png";
import restImg4 from "./regular_4.png";
import restImg45 from "./regular_4_half.png";
import restImg5 from "./regular_5.png";
import "materialize-css/dist/css/materialize.min.css";

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
        <div className="row">
          <div className="col s12 m7">
            <div className="card">
              <li key={r._id}>
                <div className="card-image">
                  <img alt="picture" src={r.image_url} />

                  <span className="card-title">Restaurant Name: {r.name}</span>
                </div>
                <div class="card-content">
                  <p>Category : {r.categories[0].title}</p> <br />
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
                  {r.rating} {/* <b>{isLoggedIn ? 'currently' : 'not'}</b> */}
                  <div class="card-action">
                    <button
                      className="btn waves-effect waves-light "
                      type="submit"
                      name="action"
                      onClick={() => this.doAddRestaurant(r)}
                    >
                      Add to My List
                    </button>

                    <button className="waves-effect waves-light btn ">
                      <a className="white-text" href={r.url}>
                        {" "}
                        Show on Website{" "}
                      </a>
                    </button>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </div>
      );
    });

    return <ul>{restaurantList}</ul>;
  }
}

export default RestChild;
