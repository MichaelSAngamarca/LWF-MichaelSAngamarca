import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Group as GroupIcon, Add as AddIcon } from "@material-ui/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
      typed: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  componentDidMount() {
    this.initTyped();
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  componentWillUnmount() {
    if (this.state.typed) {
      this.state.typed.destroy();
    }
  }
  initTyped() {
    const options = {
      strings: ["Listen With Friends!",],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };
  }
  renderHomePage() {
    return (
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} align="center">
          <Typography
            variant="h3"
            className="typed-text"
            style={{
              color: "white",
              fontWeight: "bolder",
              textShadow: "3px 3px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Listen With Friends!
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained">
            <Button
              component={Link}
              to="/join"
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
              startIcon={<GroupIcon />}
            >
              Join a Room
            </Button>
            <Button
              component={Link}
              to="/create"
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "20px",
                padding: "10px 20px",
                fontSize: "16px",
                display: "flex",
                justifyContent: "space-between",
              }}
              startIcon={<AddIcon />}
            >
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }

  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.state.roomCode ? (
                <Redirect to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              );
            }}
          />
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/create" component={CreateRoomPage} />
          <Route
            path="/room/:roomCode"
            render={(props) => {
              return <Room {...props} leaveRoomCallback={this.clearRoomCode} />;
            }}
          />
        </Switch>
      </Router>
    );
  }
}
