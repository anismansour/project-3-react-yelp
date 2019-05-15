import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { runInThisContext } from "vm";
import RestaurantList from "../RestChild/RestChild";

class ShowUser extends Component {
  state = {
    user: {},
    data: {
      todo: ""
    }
  };

  componentDidMount() {
    this.doGetUser().then(({ user }) => this.setState({ user }));
  }

  changeHandler = e => {
    this.setState({
      data: {
        [e.target.name]: e.target.value
      }
    });
  };

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

  EditTodo = async index => {
    // console.log(this.state.todo);
    try {
      const editResponse = await fetch(
        `/users/${this.props.match.params.id}/restaurants/${index}`,
        {
          method: "PUT",
          credential: "include",
          body: JSON.stringify(this.state.data),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      // console.log(editResponse);
      const editResponseJson = await editResponse.json();
      console.log(editResponseJson);
      if (editResponseJson.success) {
        this.setState({
          data: {
            user: editResponseJson.data,
            todo: ""
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.user.restaurantId);
    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <h1>{this.state.user.password}</h1>

        {this.state.user.restaurantId &&
          this.state.user.restaurantId.map((r, i) => (
            <li>
              <br />
              <img className="img" alt="picture" src={r.image_url} />
              <br />
              <a href={r.url}> {r.name} </a> <br />
              <p>{r.categories[0].title}</p>
              <p>{r.note ? r.note : "add a note!"}</p>
              <form style={{ display: "flex" }}>
                <input
                  type="text"
                  name="todo"
                  placeholder="{this.state.note}"
                  style={{ flex: "10", padding: "5px" }}
                  value={this.state.data.todo}
                  onChange={this.changeHandler}
                />
              </form>
              <button
                className="btn"
                style={{ flex: "1", color: "white", backgroundColor: "red" }}
                onClick={() => this.EditTodo(i)}
              >
                Submit
              </button>
              <br />
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
