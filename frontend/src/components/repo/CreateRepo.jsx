import React, { useEffect, useState } from "react";
import Footer from "../../footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../../environment";

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
  const [userInfo, setUserInfo] = useState({ username: "Md Irfan" });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [privacy, setPrivacy] = useState("Public");

  const [isOn, setIsOn] = useState(true);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [privacyAnchor, setPrivacyAnchor] = useState(null);
  const [gitIgnore, setGitIgnore] = useState(null);
  const [license, setLicence] = useState(null);

  const openAdd = Boolean(anchorAdd);
  const openPrivacy = Boolean(privacyAnchor);
  const openGitIgnore = Boolean(gitIgnore);
  const openLicense = Boolean(license);

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn((prev) => !prev);
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

    fetchUserDetails();
  }, []);

  // handle Create Repo - send data to database

  let handleSubmitCreateRepo = async () => {
    const userId = localStorage.getItem("userId");

    if (!name.trim()) {
      return alert("Repository name is required!");
    }

    const repoData = {
      owner: userId,
      name: name,
      description: description,
      content: [],
      visibility: visibility,
      issues: [],
    };
    try {
      const response = await axios.post(`${server}/repo/create`, repoData);

      navigate("/");
    } catch (err) {
      console.error("Error while creating New Repository : ", err);
    }
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
            {/* Owner */}
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
                    textTransform: "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar src={OwnerPfp} sx={{ width: 22, height: 22 }} />
                    <Typography>{userInfo.username}</Typography>
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
                    {userInfo.username}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            {/* Repository Name */}
            <Box sx={{ width: "80%" }}>
              <Box>
                <Typography>Repository Name *</Typography>
              </Box>
              <InputBase
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  marginTop: "0.5rem",
                  width: "100%",
                  border: "1px solid #50555aff",
                  borderRadius: "0.5rem",
                  color: "#fff",
                  padding: "0.1rem 1rem",
                }}
                required
              />
            </Box>
          </Box>

          <Box sx={{ margin: "0.8rem 0 1.3rem" }}>
            <Typography>
              Great repository names are short and memorable.
            </Typography>
          </Box>

          {/* Description */}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{
                maxLength: 350,
              }}
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
                {description.length}/350 characters
              </Typography>
            </Box>
          </Box>

          <Box sx={{ margin: "2rem 0 1rem" }}>
            <Typography variant="h5">Configuration</Typography>
          </Box>

          {/* Choose Visibility - Privacy {Public/private} */}

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
                    {privacy === "Public" ? (
                      <PublicIcon />
                    ) : (
                      <HttpsOutlinedIcon />
                    )}

                    <Typography sx={{ textTransform: "none" }}>
                      {privacy}
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
                  onClick={() => {
                    setPrivacy("Public");
                    setVisibility(false);
                    setPrivacyAnchor(null);
                  }}
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
                      {privacy}
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
                  onClick={() => {
                    setPrivacy("Private");
                    setVisibility(true);
                    setPrivacyAnchor(null);
                  }}
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
              border: "2px solid #fff",
              borderRadius: "0.5rem",
              border: "1px solid #50555A",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {/* Add README.md */}
            <Box
              sx={{
                width: "97%",
                height: "4rem",
                borderBottom: "1px solid #50555A",
                padding: "0.75rem 0",
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

            {/* Add .gitignore */}
            <Box
              sx={{
                width: "97%",
                height: "4rem",
                borderBottom: "1px solid #50555A",
                padding: "0.75rem 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Box>
                  <Typography variant="h7" sx={{ fontWeight: "500" }}>
                    Add .gitignore
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
                    .gitignore tells git which files not to track.
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <Button
                    onClick={(e) => setGitIgnore(e.currentTarget)}
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
                      <Typography
                        sx={{ textTransform: "lowercase", fontSize: "0.8rem" }}
                      >
                        No .gitignore
                      </Typography>
                    </Box>

                    <ArrowDropDownIcon
                      sx={{ color: "#7a7676ff", marginLeft: "0.4rem" }}
                    />
                  </Button>
                </Box>

                <Menu
                  anchorEl={gitIgnore}
                  open={openGitIgnore}
                  onClose={() => setGitIgnore(null)}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#010409",
                      color: "white",
                      width: "12rem",
                      border: "1px solid #30363d",
                      borderRadius: "0.8rem",
                      padding: "0.4rem",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => setGitIgnore(null)}
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
                      <Typography
                        sx={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}
                      >
                        No .gitignore
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* Add Licence */}
            <Box
              sx={{
                width: "97%",
                height: "4rem",
                padding: "0.75rem 0 ",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Box>
                  <Typography variant="h7" sx={{ fontWeight: "500" }}>
                    Add license
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
                    Licenses explain how others can use your code.
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box sx={{ marginTop: "0.5rem" }}>
                  <Button
                    onClick={(e) => setLicence(e.currentTarget)}
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
                      <Typography
                        sx={{ textTransform: "lowercase", fontSize: "0.8rem" }}
                      >
                        No .Licenses
                      </Typography>
                    </Box>

                    <ArrowDropDownIcon
                      sx={{ color: "#7a7676ff", marginLeft: "0.4rem" }}
                    />
                  </Button>
                </Box>

                <Menu
                  anchorEl={license}
                  open={openLicense}
                  onClose={() => setLicence(null)}
                  PaperProps={{
                    sx: {
                      backgroundColor: "#010409",
                      color: "white",
                      width: "12rem",
                      border: "1px solid #30363d",
                      borderRadius: "0.8rem",
                      padding: "0.4rem",
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => setLicence(null)}
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
                      <Typography
                        sx={{ fontSize: "0.9rem", marginLeft: "0.5rem" }}
                      >
                        No .Licenses
                      </Typography>
                    </Box>
                  </MenuItem>
                </Menu>
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
              onClick={handleSubmitCreateRepo}
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
