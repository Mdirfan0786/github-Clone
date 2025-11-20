import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import githubLogo from "../assets/github-mark-white.svg";
import axios from "axios";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState({ username: "Md Irfan" });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
          );
          setUserDetails(response.data);
        } catch (err) {
          console.error("Cannot fetch user details: ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#010409",
          paddingX: 2,
          height: "4rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* LEFT SIDE (menu + Logo + GitHub text) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
              gap: 2,
            }}
          >
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "white",
                gap: 2,
              }}
            >
              <img src={githubLogo} alt="GitHub Logo" style={{ width: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {userDetails.username}
              </Typography>
            </Box>
          </Box>

          {/* RIGHT SIDE (Links) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography
              component={Link}
              to="/createRepo"
              sx={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Create a Repository
            </Typography>

            <Typography
              component={Link}
              to="/profile"
              sx={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Profile
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
