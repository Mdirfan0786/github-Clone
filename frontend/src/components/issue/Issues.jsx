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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../../footer";
import axios from "axios";
import server from "../../environment";

function Issues() {
  const navigate = useNavigate();
  const location = useLocation();
  const { repoId: routeRepoId } = useParams();

  const userId = localStorage.getItem("userId");

  const [open, setOpen] = useState(false);
  const [newIssueOpen, setNewIssueOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [activeRepoId, setActiveRepoId] = useState(null);

  const [issues, setIssues] = useState([]);
  const [searchIssue, setSearchIssue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const sidebarItems = [
    { label: "Assigned to me", route: "/issues/assigned" },
    { label: "Created by me", route: "/issues/created" },
    { label: "Mentioned", route: "/issues/mentioned" },
    { label: "Recent activity", route: "/issues/recent" },
  ];

  // Redirect /issues to --> /issues/assigned
  useEffect(() => {
    if (location.pathname === "/issues") {
      navigate("/issues/assigned", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const res = await axios.get(`${server}/repo/user/${userId}`);
      setRepositories(res.data.repositories || []);
      if (res.data.repositories?.length > 0) {
        setActiveRepoId(res.data.repositories[0]._id);
      }
    } catch (err) {
      console.error("Repo fetch error:", err.message);
    }
  };

  // Fetch issues when active repo changes
  useEffect(() => {
    if (!activeRepoId) return;

    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${server}/issue/all/${activeRepoId}`);
        setIssues(response.data || []);
        setSearchResults(response.data || []);
      } catch (err) {
        console.error("Error while fetching issues:", err);
      }
    };

    fetchIssues();
  }, [activeRepoId]);

  // Repo select
  const handleRepoSelect = (repoId) => {
    setActiveRepoId(repoId);
    setOpen(false);
    navigate(`/issue/${repoId}`);
  };

  // ========= Toggle open/close issue
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

      setSearchResults((prev) =>
        prev.map((issue) =>
          issue._id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
    } catch (err) {
      console.error("Error while updating issue:", err);
    }
  };

  // ======== Search Filter

  useEffect(() => {
    if (searchIssue.trim() === "") {
      setSearchResults(issues);
    } else {
      const filtered = issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchIssue.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchIssue.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchIssue, issues]);

  const currentTitle =
    sidebarItems.find((item) => location.pathname === item.route)?.label ||
    "Issues";

  return (
    <>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
        }}
      >
        {/* LEFT SIDEBAR */}
        <Box sx={{ width: 260, borderRight: "1px solid #30363d", p: 2 }}>
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              {currentTitle}
            </Typography>

            <Box>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                sx={{
                  backgroundColor: "#238636",
                  marginRight: 2,
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#2ea043" },
                }}
              >
                Change Repo
              </Button>

              <Button
                variant="contained"
                onClick={() => setNewIssueOpen(true)}
                sx={{
                  backgroundColor: "#238636",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#2ea043" },
                }}
              >
                New issue
              </Button>
            </Box>
          </Box>

          {/* SEARCH BAR */}
          <TextField
            fullWidth
            size="small"
            value={searchIssue}
            placeholder="Search issues..."
            sx={{
              mb: 3,
              border: "1px solid #30363d",
              borderRadius: 2,
              input: { color: "#c9d1d9" },
            }}
            onChange={(e) => setSearchIssue(e.target.value)}
          />

          {/* RESULTS */}
          <Box sx={{ border: "1px solid #30363d", borderRadius: 2 }}>
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

            {searchResults.length === 0 ? (
              <Box
                sx={{
                  minHeight: 250,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>No Issues Found</Typography>
              </Box>
            ) : (
              searchResults.map((issue) => (
                <Box
                  key={issue._id}
                  sx={{
                    borderTop: "1px solid #30363d",
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    "&:hover": { backgroundColor: "#161B22" },
                  }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {issue.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {issue.description}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: issue.status === "open" ? "#2ea043" : "#f85149",
                      }}
                    >
                      ● {issue.status.toUpperCase()}
                    </Typography>
                  </Box>

                  <Button
                    size="large"
                    variant="outlined"
                    color={issue.status === "open" ? "success" : "error"}
                    onClick={() => toggleIssueStatus(issue._id, issue.status)}
                    sx={{ maxHeight: 40 }}
                  >
                    {issue.status === "open" ? "Close" : "Reopen"}
                  </Button>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>

      {/* REPO MODAL */}
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
      <Dialog
        open={newIssueOpen}
        onClose={() => setNewIssueOpen(false)}
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

      <Footer />
    </>
  );
}

export default Issues;
