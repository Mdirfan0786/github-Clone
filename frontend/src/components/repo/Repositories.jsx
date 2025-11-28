import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navbar";
import Footer from "../../footer";
import server from "../../environment";
import { Link } from "react-router-dom";

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

import gitpfp from "../../assets/git_pfp.jpg";

// LEFT PANEL USER DATA (dummy for now)
const user = {
  name: "MD IRFAN",
  username: "Mdirfan0786",
  bio: "Full-Stack Developer in progress | Learning & building with MERN stack",
  followers: 0,
  following: 1,
};

function Repositories() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuRepo, setMenuRepo] = useState(null);

  const [userDetails, setUserDetails] = useState({
    username: "Md Irfan",
    email: "irfan@irfan.com",
  });
  const [repositories, setRepositories] = useState([]);
  const [searchRepositories, setSearchRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [starredRepos, setStarredRepos] = useState([]);

  const toggleStar = async (repoId) => {
    console.log("repoId going to backend:", repoId);
    try {
      const userId = localStorage.getItem("userId");
      console.log("userId:", userId);

      await axios.post(`${server}/repo/star/${repoId}`, {
        userId,
      });

      setStarredRepos((prev) =>
        prev.includes(repoId)
          ? prev.filter((id) => id !== repoId)
          : [...prev, repoId]
      );
    } catch (err) {
      console.error("Star toggle failed:", err);
    }
  };

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(`${server}/repo/starred/${userId}`);

        const starredIds = res.data.map((repo) => repo._id);
        setStarredRepos(starredIds);
      } catch (err) {
        console.error("Error fetching starred repos", err);
      }
    };

    fetchStarred();
  }, []);

  const handleMenuOpen = (event, repoId) => {
    setAnchorEl(event.currentTarget);
    setMenuRepo(repoId); // jis repo ka menu open hua
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuRepo(null);
  };

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

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`${server}/repo/all`);
        setRepositories(response.data);
      } catch (err) {
        console.error("Error while fetching repositories! : ", err);
      }
    };

    fetchUserDetails();
    fetchRepositories();
  }, []);

  // Search Filter

  useEffect(() => {
    if (searchQuery === "") {
      setSearchRepositories(repositories);
    } else {
      const filtered = repositories.filter((repo) => {
        return repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchRepositories(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          px: 15,
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
            src={gitpfp}
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
            onClick={(e) => alert("edit profile coming soon!")}
          >
            Edit profile
          </Button>

          <Typography sx={{ color: "#8b949e" }}>
            <b style={{ color: "#c9d1d9" }}>{user.followers}</b> followers ·{" "}
            <b style={{ color: "#c9d1d9" }}>{user.following}</b> following
          </Typography>

          <a
            href="https://www.linkedin.com/in/md-irfan-2623b4210?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Typography
              sx={{ mt: 2, color: "#58a6ff", cursor: "pointer", fontSize: 14 }}
            >
              https://www.linkedin.com/in/md-irfan
            </Typography>
          </a>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

            <Link to={"/createRepo/:id"}>
              <Button variant="contained" sx={{ bgcolor: "#238636" }}>
                New
              </Button>
            </Link>
          </Box>

          {/* Repo List */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {searchRepositories.map((repo) => (
              <Box
                key={repo._id}
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
                        {repo.visibility === true ? "Public" : "Private"}
                      </Box>
                    </Box>

                    <Typography sx={{ color: "#adbac7", mt: 0.5 }}>
                      {repo.description}
                    </Typography>
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
                      startIcon={
                        starredRepos.includes(repo._id) ? (
                          <StarBorderIcon style={{ fill: "yellow" }} />
                        ) : (
                          <StarBorderIcon />
                        )
                      }
                      onClick={() => toggleStar(repo._id)}
                    >
                      {starredRepos.includes(repo._id) ? "Starred" : "Star"}
                    </Button>

                    <IconButton
                      onClick={(e) => handleMenuOpen(e, repo._id)}
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
                      <MenuItem
                        onClick={() => {
                          toggleStar(menuRepo); // ⭐ Unstar logic
                          handleMenuClose();
                        }}
                      >
                        {starredRepos.includes(menuRepo) ? "Unstar" : "Star"}
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          handleMenuClose();
                        }}
                      >
                        Copy link
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Repositories;
