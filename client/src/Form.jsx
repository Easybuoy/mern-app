import React, { Component } from "react";
// import axios from 'axios
export default class Form extends Component {
  state = {
    username: "",
    password: "",
    success: false,
    err: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const stringData = { username: this.state.username, password: this.state.password };
    
    fetch("http://localhost:3001/addString", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(stringData)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ success: true });
      })
      .catch(err =>{
        this.setState({ err })
        console.log(err)
      });
  };
  render() {
    console.log(this.state);
    if (this.state.success) {
      alert("Successfully created user");
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            placeholder="Enter username"
            onChange={this.onChange}
            name="username"
            type="email"
          />

          <input
            placeholder="Enter password"
            onChange={this.onChange}
            name="password"
            type="password"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
