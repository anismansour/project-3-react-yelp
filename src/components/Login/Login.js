import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    name: "",
    password: "",
    logged: false
  };
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  onSubmit = async e => {
    e.preventDefault();
    const loginResponse = await fetch("/users/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(this.state),
      headers: {
        "Content-type": "application/json"
      }
    });

    // res.json({
    //     data: foundUser,
    //     sucess: true
    // })

    const parsedResponse = await loginResponse.json();
    if (parsedResponse.success) {
      this.setState({ logged: true });
    }
  };

  render() {
    return this.state.logged ? (
      <Redirect to="/" />
    ) : (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.changeHandler}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.changeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Login;
