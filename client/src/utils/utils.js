export default {
  callApi: async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  },
  handleSubmit: async localState => {
    const response = await fetch("/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ post: localState.state.post })
    });
    const body = await response.text();
    localState.setState({ responseToPost: body });
  },
  handleInputChange: event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
};
