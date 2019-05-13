import React, { Component } from "react";

class RestaurantsList extends Component {
  state = {
    restaurants: []
  };

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1");
      const restaurantParsed = await response.json();
      console.log(restaurantParsed);
      this.setState({ restaurants: restaurantParsed.data[0].name });
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  render() {
    // const ListRestaurants = props => {
    //   const listRestaurants = props.restaurants.map((restaurant, i) => (
    //     <div>
    //       <li key={i}>{restaurant.description.title}</li>
    //     </div>
    //   ));
    // };

    return (
      <table key={this.props.restaurant.id}>
        <tbody>
          <tr>
            <td>
              <img
                alt="picture"
                width="60"
                src={this.props.restaurant.restaurantImage}
              />
            </td>
            <td>
              {/* {listRestaurants} */}
              <h1>{this.state.restaurants}</h1>
              <p>{this.props.restaurant.description}</p>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RestaurantsList;
