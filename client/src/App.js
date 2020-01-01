import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import handler from "./utils/utils";
import journal from "./utils/exampleJournal";
const exampleJournal = journal.journal;
class App extends Component {
  state = {
    post: "",
    responseToPost: "",
    serverResponse: "",
    dbResponse: "",
    functionResponse: ""
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
    console.log(exampleJournal);
  }

  queryDb = async () => {
    const response = await fetch("/api/testDb", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.text();
    this.setState({ dbResponse: body });
  };

  queryFunction = async () => {
    const response = await fetch("/api/testFunction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exampleJournal)
    });
    // await console.log(response);
    const body = await response.text();
    this.setState({ functionResponse: body });
  };

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

          <button onClick={this.queryDb}>query DB</button>
          <p>Response from DB: {this.state.dbResponse}</p>

          <button onClick={this.queryFunction}>test function</button>
          <p>Response from server: {this.state.functionResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
