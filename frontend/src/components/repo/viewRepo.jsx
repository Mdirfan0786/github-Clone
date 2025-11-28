import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import Footer from "../../footer";
import server from "../../environment";

function ViewRepo() {
  const { repoId } = useParams();

  const [repo, setRepo] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchRepo();
  }, []);

  const fetchRepo = async () => {
    try {
      const res = await axios.get(`${server}/repo/${repoId}`);
      setRepo(res.data.repository);
      setFiles(res.data.files || []);
    } catch (err) {
      console.error("Repo fetch error:", err);
    }
  };

  const copyCloneUrl = () => {
    navigator.clipboard.writeText(
      `${server}/${repo?.owner?.username}/${repo?.name}`
    );
  };

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
          p: 3,
        }}
      >
        {/* ======= REPO HEADER ======= */}
        {repo && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ mr: 1, bgcolor: "#238636" }}>
                {repo.owner?.username[0].toUpperCase()}
              </Avatar>

              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: "#58a6ff" }}
              >
                {repo.owner?.username} / {repo.name}
              </Typography>

              <Chip
                label={repo.visibility || "Public"}
                size="small"
                sx={{
                  ml: 2,
                  color: "#c9d1d9",
                  borderColor: "#30363d",
                }}
                variant="outlined"
              />
            </Box>

            <Typography sx={{ opacity: 0.8 }}>
              {repo.description || "No description provided."}
            </Typography>
          </Box>
        )}

        {/* ======= ACTION BAR ======= */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small">
              ⭐ Star
            </Button>
            <Button variant="outlined" size="small">
              🍴 Fork
            </Button>
            <Button variant="outlined" size="small">
              👁 Watch
            </Button>
          </Box>

          {/* CLONE BOX */}
          <Box
            sx={{
              border: "1px solid #30363d",
              borderRadius: 1,
              px: 2,
              py: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {`${server}`}/{repo?.owner?.username}/{repo?.name}
            </Typography>
            <IconButton size="small" onClick={copyCloneUrl}>
              <ContentCopyIcon sx={{ fontSize: 16, color: "#c9d1d9" }} />
            </IconButton>
          </Box>
        </Box>

        {/* ======= TABS BAR ======= */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            borderBottom: "1px solid #30363d",
            mb: 2,
          }}
        >
          {["Code", "Issues", "Pull Requests", "Actions"].map((item) => (
            <Typography
              key={item}
              sx={{
                pb: 1,
                cursor: "pointer",
                fontWeight: 600,
                borderBottom: item === "Code" ? "2px solid #f78166" : "none",
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* ======= FILE LIST ======= */}
        <Box
          sx={{
            border: "1px solid #30363d",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#151b23",
              px: 2,
              py: 1,
              fontWeight: 600,
            }}
          >
            Files
          </Box>

          {files.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center", opacity: 0.7 }}>
              No files found in this repository.
            </Box>
          ) : (
            files.map((file) => (
              <Box
                key={file._id}
                sx={{
                  px: 2,
                  py: 1.2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #30363d",
                  "&:hover": {
                    backgroundColor: "#161b22",
                  },
                }}
              >
                <Typography sx={{ color: "#58a6ff" }}>
                  {file.filename}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  {new Date(file.updatedAt).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default ViewRepo;
