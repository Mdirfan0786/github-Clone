import React, { useState } from "react";
import Footer from "../../footer";

import {
  Box,
  Typography,
  Button,
  Avatar,
  Drawer,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoneIcon from "@mui/icons-material/Done";
import PublicIcon from "@mui/icons-material/Public";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

import { Link } from "react-router-dom";
import Navbar from "../navbar";
import OwnerPfp from "../../assets/git_pfp.jpg";

function CreateRepo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("Public");
  const [open, setOpen] = useState(false);

  const [isOn, setIsOn] = useState(true);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [privacyAnchor, setPrivacyAnchor] = useState(null);

  const openAdd = Boolean(anchorAdd);
  const openPrivacy = Boolean(privacyAnchor);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          background: "#0D1117",
        }}
      >
        <Box
          sx={{
            width: { xs: "90vw", md: "50vw" },
          }}
        >
          <Box
            sx={{
              paddingBottom: "0.8rem",
              borderBottom: "1px solid #30363d",
              lineHeight: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "500", marginTop: "2rem" }}
            >
              Create a new repository
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#9198A1", fontWeight: "200", marginTop: "0.5rem" }}
            >
              Repositories contain a project's files and version history. Have a
              project elsewhere?{" "}
              <Link
                style={{
                  color: "#1E90FF",
                  textDecoration: "underline",
                  fontWeight: "200",
                }}
              >
                Import a repository.
              </Link>
            </Typography>
          </Box>

          <Box sx={{ margin: "1.5rem 0 2rem 0" }}>
            <Typography
              variant="body2"
              sx={{ color: "#9198A1", fontWeight: "200" }}
            >
              Required fields are marked with an asterisk (*).
            </Typography>
          </Box>

          <Box sx={{ marginBottom: "1rem" }}>
            <Typography variant="h5"> General </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "20%", marginRight: "3rem" }}>
              <Box>
                <Typography>Owner*</Typography>
              </Box>

              <Box sx={{ marginTop: "0.5rem" }}>
                <Button
                  onClick={(e) => setAnchorAdd(e.currentTarget)}
                  style={{
                    backgroundColor: "#262C36",
                    border: "1px solid #50555A",
                    height: "2.3rem",
                    width: "10.8rem",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 0.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={OwnerPfp} sx={{ width: 22, height: 22 }} />
                    <Typography>Md Irfan</Typography>
                  </Box>

                  <ArrowDropDownIcon sx={{ color: "#fff" }} />
                </Button>
              </Box>

              <Menu
                anchorEl={anchorAdd}
                open={openAdd}
                onClose={() => setAnchorAdd(null)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#010409",
                    color: "white",
                    width: "18rem",
                    border: "1px solid #30363d",
                    borderRadius: "0.6rem",
                    padding: "0.4rem",
                  },
                }}
              >
                <MenuItem onClick={() => setAnchorAdd(null)}>
                  Choose an owner
                </MenuItem>
                <MenuItem
                  onClick={() => setAnchorAdd(null)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#21262d",
                      color: "#fff",
                      borderRadius: 2,
                    },
                  }}
                >
                  <DoneIcon sx={{ fontSize: "1rem", marginRight: "0.7rem" }} />

                  <Avatar src={OwnerPfp} sx={{ width: 22, height: 22 }} />

                  <Typography sx={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}>
                    username
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ width: "80%" }}>
              <Box>
                <Typography>Repository Name*</Typography>
              </Box>

              <InputBase
                sx={{
                  marginTop: "0.5rem",
                  width: "100%",
                  border: "1px solid #50555aff",
                  borderRadius: "0.5rem",
                  color: "#fff",
                  padding: "0.1rem 1rem",
                }}
              />
            </Box>
          </Box>

          <Box sx={{ margin: "0.8rem 0 1.3rem" }}>
            <Typography>
              Great repository names are short and memorable.
            </Typography>
          </Box>

          <Box
            sx={{ paddingBottom: "2rem", borderBottom: "1px solid #30363d" }}
          >
            <Box>
              <Typography>Description</Typography>
            </Box>

            <InputBase
              multiline
              minRows={5}
              placeholder="Repository DescriptionAdd a short description (optional)"
              sx={{
                marginTop: "0.5rem",
                width: "100%",
                border: "1px solid #50555A",
                borderRadius: "0.5rem",
                color: "#fff",
                padding: "0.5rem 1rem",
              }}
            />

            <Box>
              <Typography
                variant="body2"
                sx={{ color: "#9198A1", marginTop: "0.4rem" }}
              >
                0/350 characters
              </Typography>
            </Box>
          </Box>

          <Box sx={{ margin: "2rem 0 1rem" }}>
            <Typography variant="h5">Configuration</Typography>
          </Box>

          <Box
            sx={{
              widows: "100%",
              height: "4rem",
              borderRadius: "0.3rem",
              border: "1px solid #50555A",
              marginBottom: "1rem",
              padding: "0.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box>
                <Typography variant="h7" sx={{ fontWeight: "500" }}>
                  Choose visibility *
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#9198A1",
                    fontWeight: "200",
                    fontSize: "0.8rem",
                  }}
                >
                  Choose who can see and commit to this repository
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box sx={{ marginTop: "0.5rem" }}>
                <Button
                  onClick={(e) => setPrivacyAnchor(e.currentTarget)}
                  style={{
                    backgroundColor: "#262C36",
                    border: "1px solid #50555A",
                    height: "2.3rem",
                    width: "8rem",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 0.5rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PublicIcon />
                    <Typography sx={{ textTransform: "lowercase" }}>
                      Public
                    </Typography>
                  </Box>

                  <ArrowDropDownIcon
                    sx={{ color: "#7a7676ff", marginLeft: "0.4rem" }}
                  />
                </Button>
              </Box>

              <Menu
                anchorEl={privacyAnchor}
                open={openPrivacy}
                onClose={() => setPrivacyAnchor(null)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#010409",
                    color: "white",
                    width: "22rem",
                    border: "1px solid #30363d",
                    borderRadius: "0.8rem",
                    padding: "0.4rem",
                  },
                }}
              >
                <MenuItem
                  onClick={() => setPrivacyAnchor(null)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    "&:hover": {
                      backgroundColor: "#21262d",
                      color: "#fff",
                      borderRadius: 2,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <PublicIcon
                      sx={{ fontSize: "1.3rem", marginRight: "0.2rem" }}
                    />

                    <Typography
                      sx={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}
                    >
                      Public
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9198A1",
                        marginTop: "0.4rem",
                        marginLeft: "2rem",
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                      }}
                    >
                      Anyone on the internet can see this repository. You choose
                      who can commit.
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => setPrivacyAnchor(null)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    "&:hover": {
                      backgroundColor: "#21262d",
                      color: "#fff",
                      borderRadius: 2,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <HttpsOutlinedIcon
                      sx={{ fontSize: "1.3rem", marginRight: "0.2rem" }}
                    />

                    <Typography sx={{ fontSize: "1rem", marginLeft: "0.5rem" }}>
                      Private
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9198A1",
                        marginTop: "0.4rem",
                        marginLeft: "2rem",
                        fontSize: "0.75rem",
                        whiteSpace: "normal",
                      }}
                    >
                      You choose who can see and commit to this repository.
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box
            sx={{
              widows: "100%",
              height: "4rem",
              borderRadius: "0.3rem",
              border: "1px solid #50555A",
              marginBottom: "1rem",
              padding: "0.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Box>
                <Typography variant="h7" sx={{ fontWeight: "500" }}>
                  Add README
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#9198A1",
                    fontWeight: "200",
                    fontSize: "0.8rem",
                  }}
                >
                  READMEs can be used as longer descriptions.
                </Typography>
              </Box>
            </Box>

            <Box>
              <Box sx={{ marginTop: "0.5rem" }}>
                <Button sx={{ color: "#fff" }} onClick={handleToggle}>
                  {isOn ? (
                    <ToggleOffOutlinedIcon sx={{ fontSize: "3rem" }} />
                  ) : (
                    <ToggleOnIcon sx={{ fontSize: "3rem" }} />
                  )}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              margin: "1.8rem 0 5rem",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#29903B", borderRadius: "0.5rem" }}
            >
              Create Repository
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default CreateRepo;
