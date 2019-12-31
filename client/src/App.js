import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import handler from "./utils/handler";

class App extends Component {
  state = {
    post: "",
    responseToPost: "",
    serverResponse: ""
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <form>
            <input
              name="post"
              placeholder="Send something to server"
              onChange={handler.handleInputChange}
            ></input>
            <button onClick={handler.handleSubmit}>Send it</button>
          </form>
          <div>
            <p>Response from Server: {this.state.responseToPost}</p>
          </div>
          <div>
            <button onClick={handler.callApi}>Call Api!</button>
            <p>Response from Server: {this.state.serverResponse}</p>
          </div>
        </header>
      </div>
    );
  }
}
