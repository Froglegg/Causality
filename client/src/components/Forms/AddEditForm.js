import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditJournalForm extends React.Component {
  state = {
    user: 0,
    journalName: "",
    condition: "",
    data: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = e => {
    e.preventDefault();
    fetch("/api/journals", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location,
        hobby: this.state.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  submitFormEdit = e => {
    e.preventDefault();
    fetch("/api/users", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.userName,
        email: this.state.email,
        password: this.state.password,
        location: this.state.location,
        hobby: this.state.hobby
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const {
        id,
        userName,
        email,
        password,
        location,
        hobby
      } = this.props.item;
      this.setState({ id, userName, email, password, location, hobby });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="">User Name</Label>
          <Input
            type="text"
            name="userName"
            id="userName"
            onChange={this.onChange}
            value={this.state.userName === null ? "" : this.state.userName}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={this.onChange}
            value={this.state.email === null ? "" : this.state.email}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Passwrod</Label>
          <Input
            type="text"
            name="password"
            id="password"
            onChange={this.onChange}
            value={this.state.password === null ? "" : this.state.password}
            placeholder="ex. 555-555-5555"
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            name="location"
            id="location"
            onChange={this.onChange}
            value={this.state.location === null ? "" : this.state.location}
            placeholder="City, State"
          />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input
            type="text"
            name="hobby"
            id="hobby"
            onChange={this.onChange}
            value={this.state.hobby}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditJournalForm;
