import React, { Component } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class RoomJoinPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: "",
      error: "",
    };
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.roomButtonPressed = this.roomButtonPressed.bind(this);
  }

  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center" style={{ color: "white" }}>
          <Typography
            variant="h4"
            component="h4"
            style={{ fontWeight: "bolder", textShadow: "3px 3px 4px rgba(0, 0, 0, 0.7)"}}
          >
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={this.state.error}
            label="Code"
            placeholder="Enter a Room Code"
            value={this.state.roomCode}
            helperText={this.state.error}
            variant="filled"
            onChange={this.handleTextFieldChange}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              color: "white", // Text color
              margin: "10px 0", // Adjust margin if needed
            }}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
            variant="contained"
            color="black"
            onClick={this.roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            to="/"
            component={Link}
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bolder",
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }

  handleTextFieldChange(e) {
    this.setState({
      roomCode: e.target.value,
    });
  }

  roomButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: this.state.roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          this.props.history.push(`/room/${this.state.roomCode}`);
        } else {
          this.setState({ error: "Room not found." });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
