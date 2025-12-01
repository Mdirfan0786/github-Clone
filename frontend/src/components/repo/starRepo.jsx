import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../environment";
import Navbar from "../navbar";
import Footer from "../../footer";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import gitpfp from "../../assets/git_pfp.jpg";

function Stars() {
  const [starredRepos, setStarredRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({
    username: "Md Irfan",
    email: "mdirfan@gmail.com",
  });
  const [loading, setLoading] = useState(true);

  // toggiling star

  const toggleUnstar = async (repoId) => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await axios.post(`${server}/repo/star/${repoId}`, { userId });

      if (res.data.starred === false) {
        setStarredRepos((prev) => prev.filter((repo) => repo._id !== repoId));
      }
    } catch (err) {
      console.error("Unstar failed:", err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
      setLoading(true);
      try {
        const [starsRes, userRes] = await Promise.all([
          axios.get(`${server}/repo/starred/${userId}`),
          axios.get(`${server}/userProfile/${userId}`),
        ]);

        setStarredRepos(starsRes.data);
        setUser(userRes.data);
      } catch (err) {
        console.error("Error loading stars page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRepos = starredRepos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: "#0d1117",
          minHeight: "100vh",
          display: "flex",
          color: "white",
          px: 12,
          pt: 4,
          gap: 5,
        }}
      >
        {/* ================= LEFT PROFILE ================= */}
        <Box sx={{ width: 280 }}>
          <Avatar src={gitpfp} sx={{ width: 230, height: 230, mb: 2 }} />

          <Typography fontSize={26} fontWeight={700}>
            {user.username}
          </Typography>

          <Typography color="#8b949e" mb={2}>
            {user.email}
          </Typography>

          <Typography mb={2} color="#c9d1d9">
            Full-Stack Developer in progress | MERN Stack
          </Typography>

          <Button
            fullWidth
            variant="outlined"
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

          <Typography color="#8b949e" fontSize={14}>
            <b style={{ color: "#c9d1d9" }}>{user?.followers || 0}</b> followers
            · <b style={{ color: "#c9d1d9" }}>{user?.following || 0}</b>{" "}
            following
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

        {/* ================= RIGHT STARS ================= */}
        <Box sx={{ flex: 1 }}>
          {/* HEADER */}
          <Typography fontSize={40} fontWeight={600} mb={3}>
            Stars
          </Typography>

          {/* SEARCH + FILTER BAR */}
          <Stack direction="row" spacing={2} mb={4}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search stars"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                maxHeight: "2.8rem",
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#444" },
                  "&:hover fieldset": { borderColor: "#666" },
                },
              }}
            />

            <Button
              variant="outlined"
              sx={{
                borderColor: "#30363d",
                color: "#c9d1d9",
                backgroundColor: "#2ea043",
              }}
            >
              Search
            </Button>
          </Stack>

          {/* STARRED REPOSITORIES */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 30 }}>
              <CircularProgress size={22} />
            </Box>
          ) : filteredRepos.length === 0 ? (
            <Typography color="gray" textAlign="center" mt={10}>
              No starred repositories yet
            </Typography>
          ) : (
            filteredRepos.map((repo) => (
              <Card
                key={repo._id}
                sx={{
                  backgroundColor: "#0d1117",
                  border: "1px solid #30363d",
                  borderLeft: "none",
                  borderRight: "none",
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {/* LEFT SIDE */}
                    <Box>
                      <Typography
                        sx={{
                          color: "#58a6ff",
                          fontWeight: 600,
                          fontSize: 16,
                        }}
                      >
                        {user.username}/
                        <span style={{ fontWeight: 700 }}>{repo.name}</span>
                      </Typography>

                      <Typography variant="body2" color="#8b949e" mt={0.5}>
                        {repo.description || "No description"}
                      </Typography>
                    </Box>

                    {/* RIGHT SIDE */}
                    <Button
                      startIcon={<StarIcon />}
                      variant="outlined"
                      sx={{
                        color: "#f1e05a",
                        borderColor: "#30363d",
                        textTransform: "none",
                      }}
                      onClick={() => toggleUnstar(repo._id)}
                    >
                      Unstar
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Stars;
