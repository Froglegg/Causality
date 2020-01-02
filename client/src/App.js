import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import handler from "./utils/utils";
import journal from "./utils/exampleJournal";
const exampleJournal = journal.journal;
class App extends Component {
  state = {
    serverResponse: "",
    usersResponse: "",
    journalsResponse: "",
    functionResponse: "",
    singleItemResponse: "",
    id: "1"
  };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   handler.handleSubmit(this);
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

  queryUsers = async () => {
    const response = await fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.text();
    this.setState({ usersResponse: body });
  };

  queryJournalItem = async id => {
    id = this.state.id;
    const response = await fetch(`/api/journals/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.text();
    this.setState({ singleItemResponse: body });
  };

  queryJournals = async () => {
    const response = await fetch("/api/journals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.text();
    this.setState({ journalsResponse: body });
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

          <button onClick={this.queryUsers}>query users</button>
          <p>Response from DB: {this.state.usersResponse}</p>

          <button onClick={this.queryJournals}>query journals</button>
          <p>Response from server: {this.state.journalsResponse}</p>

          <button onClick={this.queryFunction}>test function</button>
          <p>Response from server: {this.state.functionResponse}</p>

          <button onClick={this.queryJournalItem}>get journal by ID</button>
          <p>Response from server: {this.state.singleItemResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
