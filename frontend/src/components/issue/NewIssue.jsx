import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import server from "../../environment";

function NewIssue() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateIssue = async () => {
    if (!title.trim()) {
      return setError("Title is required!");
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(
        `${server}/issue/create`,
        { title, description },
        { withCredentials: true }
      );

      console.log("Issue created:", data);
      navigate("/issues/assigned");
    } catch (err) {
      console.error("Create issue error:", err.response?.data || err.message);
      setError("Issue create nahi ho paaya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
          p: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 720 }}>
          {/* HEADER */}
          <Typography variant="h4" fontWeight="bold" mb={3}>
            Create new issue
          </Typography>

          {/* FORM CARD */}
          <Box
            sx={{
              border: "1px solid #30363d",
              borderRadius: 2,
              backgroundColor: "#0d1117",
            }}
          >
            {/* TOP BAR */}
            <Box
              sx={{
                px: 2,
                py: 1.5,
                borderBottom: "1px solid #30363d",
                backgroundColor: "#151B23",
              }}
            >
              <Typography fontWeight="bold">Add a new issue</Typography>
            </Box>

            {/* FORM BODY */}
            <Box sx={{ p: 3 }}>
              {/* TITLE */}
              <Typography mb={1}>Title</Typography>
              <TextField
                fullWidth
                placeholder="Issue title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
                sx={{
                  mb: 3,
                  input: { color: "#c9d1d9" },
                  "& fieldset": { borderColor: "#30363d" },
                }}
              />

              {/* DESCRIPTION */}
              <Typography mb={1}>Description</Typography>
              <TextField
                fullWidth
                multiline
                minRows={5}
                placeholder="Leave a comment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  mb: 3,
                  textarea: { color: "#c9d1d9" },
                  "& fieldset": { borderColor: "#30363d" },
                }}
              />

              {/* ERROR */}
              {error && (
                <Typography color="error" mb={2}>
                  {error}
                </Typography>
              )}

              {/* ACTION BUTTONS */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#c9d1d9",
                    borderColor: "#30363d",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={handleCreateIssue}
                  sx={{
                    backgroundColor: "#238636",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#2ea043" },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    "Submit new issue"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default NewIssue;
