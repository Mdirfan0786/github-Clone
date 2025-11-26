import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../navbar";
import axios from "axios";
import server from "../../environment";

function Issues() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  const [open, setOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);

  const sidebarItems = [
    { label: "Assigned to me", route: "/issues/assigned" },
    { label: "Created by me", route: "/issues/created" },
    { label: "Mentioned", route: "/issues/mentioned" },
    { label: "Recent activity", route: "/issues/recent" },
  ];

  useEffect(() => {
    if (location.pathname === "/issues") {
      navigate("/issues/assigned", { replace: true });
    }
  }, [location.pathname, navigate]);

  //  Fetch repositories when modal opens
  useEffect(() => {
    if (open) {
      fetchRepos();
    }
  }, [open]);

  const fetchRepos = async () => {
    try {
      const res = await axios.get(`${server}/repo/${userId}`);
      console.log(res.data);
      setRepositories(res.data);
    } catch (err) {
      console.error("Repo fetch error:", err.message);
    }
  };

  // Dynamic header title
  const currentTitle =
    sidebarItems.find((item) => location.pathname === item.route)?.label ||
    "Issues";

  // Repo select handler
  const handleRepoSelect = (repoId) => {
    setOpen(false);
    navigate(`/issue/${repoId}`);
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
        }}
      >
        {/* LEFT SIDEBAR */}
        <Box
          sx={{
            width: 260,
            borderRight: "1px solid #30363d",
            p: 2,
          }}
        >
          {sidebarItems.map((item) => (
            <Typography
              key={item.route}
              onClick={() => navigate(item.route)}
              sx={{
                py: 1,
                px: 1.5,
                borderRadius: 2,
                mb: 1,
                cursor: "pointer",
                backgroundColor:
                  location.pathname === item.route ? "#161b22" : "transparent",
                fontWeight:
                  location.pathname === item.route ? "bold" : "normal",
                "&:hover": { backgroundColor: "#161b22" },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>

        {/* MAIN CONTENT */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Dynamic Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {currentTitle}
            </Typography>

            {/* ✅ FIXED BUTTON */}
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{
                backgroundColor: "#238636",
                textTransform: "none",
                "&:hover": { backgroundColor: "#2ea043" },
              }}
            >
              New issue
            </Button>
          </Box>

          {/* SEARCH BAR */}
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="is:issue state:open archived:false assignee:@me sort:updated-desc"
            InputProps={{
              sx: { color: "#c9d1d9", borderRadius: 2 },
            }}
            sx={{
              mb: 3,
              border: "1px solid #30363d",
              borderRadius: 2,
              input: { color: "#c9d1d9" },
            }}
          />

          {/* RESULTS */}
          <Box
            sx={{
              border: "1px solid #30363d",
              borderRadius: 2,
              minHeight: 300,
            }}
          >
            <Box
              sx={{
                minHeight: 50,
                backgroundColor: "#151B23",
                px: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>results</Typography>
              <Typography>Updated</Typography>
            </Box>

            <Box
              sx={{
                borderTop: "1px solid #30363d",
                minHeight: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box textAlign="center">
                <Typography variant="h6">No results</Typography>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Try adjusting your search filters.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/*  REPOSITORY SELECT MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#010409",
            color: "#c9d1d9",
            border: "1px solid #30363d",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: "1px solid #30363d" }}>
          Select Repository
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <List>
            {repositories.map((repo) => (
              <ListItem
                key={repo._id}
                button
                onClick={() => handleRepoSelect(repo._id)}
                sx={{
                  border: "1px solid #30363d",
                  borderRadius: 1,
                  mb: 1,
                  cursor: "pointer",
                  backgroundColor: "#0d1117",
                  "&:hover": {
                    backgroundColor: "#161b22",
                  },
                }}
              >
                {repo.name}
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid #30363d" }}>
          <Button onClick={() => setOpen(false)} sx={{ color: "#c9d1d9" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Issues;
