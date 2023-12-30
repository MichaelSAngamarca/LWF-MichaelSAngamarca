import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
    };
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }

  playSong() {
    const { queue } = this.state;
    const currentSong = {
      title: this.props.title,
      artist: this.props.artist,
      // Add other relevant song details
    };

    const newQueue = [...queue, currentSong];
    this.setState({ queue: newQueue });

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    const getColor = (value) => {
      const red = Math.round(255 - (255 * value) / 100);
      const green = Math.round((255 * value) / 100);
      return `rgb(${red}, ${green}, 0)`;
    };

    return (
      <Card
        style={{
          maxWidth: 400,
          margin: "auto",
          padding: 16,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: 16,
          backgroundColor: "#F5F5F5", // Light gray background
        }}
      >
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item xs={12} align="center">
            <img
              src={this.props.image_url}
              height="100%"
              width="100%"
              alt="Album Cover"
              style={{
                borderRadius: 8,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography
              variant="h6"
              component="h6"
              style={{
                marginBottom: 8,
                color: "#333",
                fontFamily: "Arial, sans-serif",
                fontSize: 24, // Increase font size
                fontWeight: "bold", // Add bold font weight
              }}
            >
              {this.props.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 18, // Increase font size
                color: "#555", // Adjust color for artist
              }}
            >
              {this.props.artist}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  this.props.is_playing ? this.pauseSong() : this.playSong();
                }}
                style={{
                  color: "#000000",
                  fontSize: 48, // Larger play/pause button
                  marginRight: 16,
                  backgroundColor: "#D6D6D6", // Light gray button background
                  borderRadius: "50%", // Circular button
                }}
              >
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton
                onClick={() => this.skipSong()}
                style={{
                  color: "#000000",
                  fontSize: 32,
                  backgroundColor: "#D6D6D6",
                  borderRadius: "50%",
                }}
              >
                <SkipNextIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                style={{
                  marginLeft: 8,
                  marginRight: 8,
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  color: "#555",
                }}
              >
                {this.props.votes} / {this.props.votes_required}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <LinearProgress
          variant="determinate"
          value={songProgress}
          style={{
            marginTop: 16,
            background: "linear-gradient(90deg, #FF8C00, #FFD700)",
            transition: "width 0.3s ease",
            borderRadius: 8,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getColor(songProgress),
            },
          }}
        />
      </Card>
    );
  }
}
