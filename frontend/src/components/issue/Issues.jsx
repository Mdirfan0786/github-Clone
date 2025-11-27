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
  ListItemButton,
  ListItemText,
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
  const [issues, setIssues] = useState([]);

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
      const res = await axios.get(`${server}/repo/user/${userId}`);
      setRepositories(res.data.repositories);
    } catch (err) {
      console.error("Repo fetch error:", err.message);
    }
  };

  // fetching Issues

  useEffect(() => {
    if (repositories.length === 0) {
      fetchRepos();
      return;
    }

    const repoId = repositories[0]._id;

    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${server}/issue/all/${repoId}`);
        setIssues(response.data);
      } catch (err) {
        console.error("Error while fetching issues : ", err);
      }
    };

    fetchIssues();
  }, [repositories]);

  // Dynamic header title
  const currentTitle =
    sidebarItems.find((item) => location.pathname === item.route)?.label ||
    "Issues";

  // Repo select handler
  const handleRepoSelect = (repoId) => {
    setOpen(false);
    navigate(`/issue/${repoId}`);
  };

  // toggle open/close issues
  const toggleIssueStatus = async (issueId, currentStatus) => {
    const newStatus = currentStatus === "open" ? "closed" : "open";

    try {
      await axios.put(`${server}/issue/update/${issueId}`, {
        status: newStatus,
      });

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (err) {
      console.error("Error while updating issue:", err);
    }
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
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                minHeight: 50,
                backgroundColor: "#151B23",
                px: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              <Typography>Results</Typography>
              <Typography>Updated</Typography>
            </Box>

            {/* Issues List */}
            {issues.length === 0 ? (
              <Box
                sx={{
                  minHeight: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: "1px solid #30363d",
                }}
              >
                <Box textAlign="center">
                  <Typography variant="h6">No results</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.6 }}>
                    Try adjusting your search filters.
                  </Typography>
                </Box>
              </Box>
            ) : (
              issues.map((issue) => (
                <Box
                  key={issue._id}
                  sx={{
                    borderTop: "1px solid #30363d",
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "#161B22",
                    },
                  }}
                >
                  {/* Left Side */}
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {issue.title} / {issue.repository}
                    </Typography>

                    <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.4 }}>
                      {issue.description}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        display: "inline-block",
                        color: issue.status === "open" ? "#2ea043" : "#f85149",
                      }}
                    >
                      ● {issue.status.toUpperCase()}
                    </Typography>
                  </Box>

                  {/* Right Side Button */}
                  <Button
                    size="small"
                    variant="outlined"
                    color={issue.status === "open" ? "success" : "error"}
                    onClick={() => toggleIssueStatus(issue._id, issue.status)}
                  >
                    {issue.status === "open" ? "Close" : "Reopen"}
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      {/*  REPOSITORY SELECT MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableRestoreFocus
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
                disablePadding
                sx={{
                  border: "1px solid #30363d",
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: "#0d1117",
                }}
              >
                <ListItemButton
                  onClick={() => handleRepoSelect(repo._id)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#161b22",
                    },
                  }}
                >
                  <ListItemText primary={repo.name} />
                </ListItemButton>
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
