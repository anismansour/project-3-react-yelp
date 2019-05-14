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
    console.log(" this is id", this.props.match.params.id);
    //e.preventDefault(e);
    try {
      const deleteRestaurant = await fetch(
        `/users/${this.props.match.params.id}/restaurants/${id}`,
        {
          method: "DELETE"
        }
      );
      console.log(deleteRestaurant, "inside try");
      const deleteRestaurantJson = await deleteRestaurant.json();
      this.setState({
        user: deleteRestaurantJson.user
      });
    } catch (err) {
      console.log(err, " error");
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.password}</h1>

        {this.state.user.restaurantId &&
          this.state.user.restaurantId.map((r, i) => (
            <li>
              <Link to={`/restaurants/${r.id}`}>{r.name}</Link>
              <button onClick={() => this.doDeleteRestaurant(r.id)}>
                delete
              </button>
            </li>
          ))}
      </div>
    );
  }
}

export default withRouter(ShowUser);
