import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class AddEditJournalForm extends React.Component {
  state = {
    id: "",
    user: "",
    journalName: "",
    condition: "",
    data: "",
    causality: ""
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
        user: this.state.user,
        journalName: this.state.journalName,
        condition: this.state.condition,
        data: this.state.data,
        causality: this.state.causality
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
        user: this.state.user,
        journalName: this.state.journalName,
        condition: this.state.condition,
        data: this.state.data,
        causality: this.state.causality
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0]);
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
        user,
        journalName,
        condition,
        data,
        causality
      } = this.props.item;
      this.setState({ id, user, journalName, condition, data, causality });
    }
  }

  render() {
    return (
      <Form
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
      >
        <FormGroup>
          <Label for="journalName">Journal Name</Label>
          <Input
            type="text"
            name="journalName"
            id="journalName"
            onChange={this.onChange}
            value={
              this.state.journalName === null ? "" : this.state.journalName
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="condition">Condition to test for</Label>
          <Input
            type="condition"
            name="condition"
            id="condition"
            onChange={this.onChange}
            value={this.state.condition === null ? "" : this.state.condition}
          />
        </FormGroup>
        <FormGroup>
          <Label for="data">Data</Label>
          <Input
            type="text"
            name="data"
            id="data"
            onChange={this.onChange}
            value={this.state.data === null ? "" : this.state.data}
            placeholder="Enter journal data here. Will need to make an array of day objects, each with a boolean for the condition, and an array of events"
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditJournalForm;
