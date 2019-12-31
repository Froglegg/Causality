import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import handler from "./utils/utils";

class App extends Component {
  state = {
    post: "",
    responseToPost: "",
    serverResponse: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    handler.handleSubmit(this);
  };
  // callApi = () => {
  //   handler.callApi();
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    handler
      .callApi()
      .then(res => this.setState({ serverResponse: res.express }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.serverResponse}</p>

          <form>
            <input
              name="post"
              placeholder="Send something to server"
              onChange={this.handleInputChange}
            ></input>
            <button onClick={this.handleSubmit}>Send it</button>
          </form>
          <div>
            <p>Response from Server: {this.state.responseToPost}</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
