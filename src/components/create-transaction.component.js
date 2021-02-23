import React, { Component } from "react";
import axios from "axios";

export default class CreateTransaction extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      role: "",
      amount: 0,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }
  onChangeAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const transaction = {
      username: this.state.username,
      role: this.state.role,
      amount: this.state.amount,
    };
    console.log(transaction);
    axios
      .post("http://localhost:5000/transactions/add", transaction)
      .then((res) => console.log(res.data));
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Transaction Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Role: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.role}
              onChange={this.onChangeRole}
            />
          </div>
          <div className="form-group">
            <label>Amount (In Rs): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.amount}
              onChange={this.onChangeAmount}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Transaction Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
