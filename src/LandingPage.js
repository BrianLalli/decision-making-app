import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Atropos from "atropos/react";
import "atropos/css";
import './LandingPage.css';
import wallpaper from  './wallpaper.jpg';

const LandingPage = ({ onStart }) => {
  return (
    <Atropos
      activeOffset={50}
      shadowScale={1.05}
      onEnter={() => console.log("Enter")}
      onLeave={() => console.log("Leave")}
      onRotate={(x, y) => console.log("Rotate", x, y)}
      className="atropos-container" // Add custom class
    >
      <Box className="content-box" sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom className="title">
          Welcome to the Decision-Making App
        </Typography>
        <img src={wallpaper} alt="Decision Making" style={{ maxWidth: "100%", height: "auto", borderRadius: "20px" }} />        
        <Typography variant="body1" className="description" sx={{ mb: 2 }}>
          This app helps you make decisions based on your values and goals.
          Simply enter your values, goals, and a scenario to get advice.
        </Typography>
        <Button variant="contained" color="primary" onClick={onStart} className="start-button">
          Get Started
        </Button>
      </Box>
    </Atropos>
  );
};

export default LandingPage;
