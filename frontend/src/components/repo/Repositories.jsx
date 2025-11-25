import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import server from "../../environment";

import {
  Box,
  Typography,
  Button,
  Avatar,
  TextField,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// LEFT PANEL USER DATA (dummy for now)
const user = {
  name: "MD IRFAN",
  username: "Mdirfan0786",
  bio: "Full-Stack Developer in progress | Learning & building with MERN stack",
  followers: 0,
  following: 1,
  avatar: "https://avatars.githubusercontent.com/u/00000000?v=4", // replace with your DP
};

// SAMPLE REPOSITORIES
const repos = [
  {
    name: "github-Clone",
    public: true,
    description: "Creating Github Clone",
    language: "JavaScript",
    updated: "17 minutes ago",
  },
  {
    name: "Zerodha-Clone",
    public: true,
    description: "Creating Zerodha Clone",
    language: "JavaScript",
    updated: "20 hours ago",
  },
  {
    name: "Mdirfan0786",
    public: true,
    description: "Config files for my GitHub profile.",
    tags: ["config", "github-config"],
    updated: "2 weeks ago",
  },
];

function Repositories() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const [userDetails, setUserDetails] = useState({
    username: "Md Irfan",
    email: "irfan@irfan.com",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${server}/userProfile/${userId}`);
        setUserDetails(response.data);
      } catch (err) {
        console.error("Error while fetching UserDetails: ", err);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          px: 4,
          py: 3,
          gap: 4,
          bgcolor: "#0d1117",
          color: "#c9d1d9",
          minHeight: "100vh",
        }}
      >
        {/* LEFT SIDE PROFILE */}
        <Box sx={{ width: "280px" }}>
          <Avatar
            src={user.avatar}
            sx={{ width: 230, height: 230, mx: "auto", mb: 2 }}
          />

          <Typography sx={{ fontSize: 28, fontWeight: 700 }}>
            {userDetails.username}
          </Typography>

          <Typography sx={{ color: "#8b949e", mb: 2 }}>
            {userDetails.email}
          </Typography>

          <Typography sx={{ mb: 2 }}>{user.bio}</Typography>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#30363d",
              color: "#c9d1d9",
              textTransform: "none",
              mb: 2,
            }}
          >
            Edit profile
          </Button>

          <Typography sx={{ color: "#8b949e" }}>
            <b style={{ color: "#c9d1d9" }}>{user.followers}</b> followers ·{" "}
            <b style={{ color: "#c9d1d9" }}>{user.following}</b> following
          </Typography>

          <Typography
            sx={{ mt: 2, color: "#58a6ff", cursor: "pointer", fontSize: 14 }}
          >
            https://www.linkedin.com/in/md-irfan
          </Typography>
        </Box>

        {/* RIGHT SIDE REPOSITORY SECTION */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Search + Filters */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              placeholder="Find a repository..."
              fullWidth
              size="small"
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#666" },
                },
              }}
            />

            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#444" }}
            >
              Type
            </Button>

            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#444" }}
            >
              Language
            </Button>

            <Button
              variant="outlined"
              sx={{ color: "#fff", borderColor: "#444" }}
            >
              Sort
            </Button>

            <Button variant="contained" sx={{ bgcolor: "#238636" }}>
              New
            </Button>
          </Box>

          {/* Repo List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {repos.map((repo, index) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid #30363d",
                  pb: 2,
                  pt: 1,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {/* LEFT INFO */}
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          color: "#58a6ff",
                          fontSize: 20,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {repo.name}
                      </Typography>

                      <Box
                        sx={{
                          border: "1px solid #444",
                          px: 1,
                          borderRadius: "10px",
                          fontSize: 12,
                          color: "#adbac7",
                        }}
                      >
                        {repo.public ? "Public" : "Private"}
                      </Box>
                    </Box>

                    <Typography sx={{ color: "#adbac7", mt: 0.5 }}>
                      {repo.description}
                    </Typography>

                    {/* Language + Updated */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      {repo.language && (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              backgroundColor: "#f1e05a",
                            }}
                          ></Box>
                          <Typography sx={{ color: "#adbac7", fontSize: 14 }}>
                            {repo.language}
                          </Typography>
                        </Box>
                      )}
                      <Typography sx={{ color: "#768390", fontSize: 14 }}>
                        Updated {repo.updated}
                      </Typography>
                    </Box>

                    {/* Tags */}
                    {repo.tags && (
                      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        {repo.tags.map((tag, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              bgcolor: "#13233a",
                              color: "#58a6ff",
                              px: 1.2,
                              py: 0.3,
                              borderRadius: "10px",
                              fontSize: 12,
                            }}
                          >
                            {tag}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>

                  {/* Star + Menu */}
                  <Box>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#444",
                        color: "#adbac7",
                        textTransform: "none",
                        mr: 1,
                      }}
                      startIcon={<StarBorderIcon />}
                    >
                      Star
                    </Button>

                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{ color: "#adbac7" }}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: { bgcolor: "#161b22", color: "#adbac7" },
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>Unstar</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Copy link</MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Repositories;
