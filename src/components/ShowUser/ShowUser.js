import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { runInThisContext } from "vm";
import RestaurantList from "../RestChild/RestChild";

class ShowUser extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.doGetUser().then(({ user }) => this.setState({ user }));
  }

  doGetUser = async () => {
    try {
      const user = await fetch(`/users/${this.props.match.params.id}`);
      const parsedUser = await user.json();
      //console.log(user);
      //console.log(this.state.user.restaurants);
      return parsedUser;
    } catch (err) {
      console.log(err);
    }
  };

  doDeleteRestaurant = async (id, e) => {
    console.log(id, " this is id");
    //e.preventDefault(e);
    try {
      const deleteRestaurant = await fetch(
        `/users/${this.props.user.restaurants.id}`,
        {
          method: "DELETE"
        }
      );
      console.log(deleteRestaurant, "inside try");
      const deleteRestaurantJson = await deleteRestaurant.json();
      this.setState({
        restaurantId: this.state.restaurantId.filter(
          (restaurant, i) => restaurant.id !== id
        )
      });
    } catch (err) {
      console.log(err, " error");
    }
  };

  // doDeleteRestaurant = async obj => {
  //   const { currentUser } = this.props;
  //   //console.log(cu);

  //   const deleteRestaurant = await fetch(`/users/:${currentUser._id}`, {
  //     method: "DELETE",
  //     credentials: "include",
  //     body: JSON.stringify(obj),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   });
  //   const parsedResponse = await deleteRestaurant.json();
  //   console.log(parsedResponse);
  // };

  render() {
    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.password}</h1>

        {this.state.user.restaurantId &&
          this.state.user.restaurantId.map((r, i) => (
            <li>
              <Link to={`/restaurants/${r.id}`}>{r.name}</Link>
              <button onClick={() => this.doDeleteRestaurant(r)}>delete</button>
            </li>
          ))}
      </div>
    );
  }
}

export default withRouter(ShowUser);
