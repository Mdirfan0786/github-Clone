import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import NotificationsIcon from "@mui/icons-material/Notifications";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import ExploreIcon from "@mui/icons-material/Explore";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../authContext";
import { useSearch } from "../SearchContext";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorAdd, setAnchorAdd] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: "Md Irfan",
    email: "demo@sjdfj.com",
  });
  const { globalSearch, setGlobalSearch } = useSearch();

  const { setCurrentUser } = useAuth();
  const open = Boolean(anchorEl);
  const openAdd = Boolean(anchorAdd);

  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("profile")) return "Profile";
    if (location.pathname.includes("createRepo")) return "Repositories";
    if (location.pathname.includes("stars")) return "Stars";
    return "Dashboard";
  };

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Fetching User Details

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/userProfile/${userId}`
          );

          setUserDetails(response.data);
        } catch (err) {
          console.error("Error while fetching UserDateils : ", err);
        }
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#010409",
          paddingX: 2,
          height: "3.8rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* LEFT SECTION */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: "#fff",
              "&:hover": {
                color: "#fff",
                cursor: "pointer",
              },
            }}
            component={Link}
            to={"/"}
          >
            <IconButton
              sx={{ border: "1px solid #30363d" }}
              onClick={() => setOpenDrawer(true)}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>

            <GitHubIcon sx={{ fontSize: 35 }} />

            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {getPageTitle()}
            </Typography>
          </Box>

          {/* SEARCH BAR */}
          <Box
            sx={{
              backgroundColor: "#010409",
              border: "1px solid #30363d",
              borderRadius: "6px",
              paddingX: 1.5,
              width: "26rem",
              height: "2.3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon
              sx={{ color: "#8b949e", fontSize: 20, marginRight: 1 }}
            />
            <InputBase
              placeholder="Type / to search"
              value={globalSearch}
              sx={{ color: "white", width: "100%" }}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              component={Link}
              to={"/"}
              sx={{ border: "1px solid #30363d" }}
            >
              <PeopleIcon sx={{ color: "white" }} />
            </IconButton>
            <IconButton
              sx={{ border: "1px solid #30363d" }}
              onClick={(e) => setAnchorAdd(e.currentTarget)}
            >
              <AddIcon sx={{ color: "white" }} />
            </IconButton>

            {/* Repository Drawer */}
            <Menu
              anchorEl={anchorAdd}
              open={openAdd}
              onClose={() => setAnchorAdd(null)}
              PaperProps={{
                sx: {
                  backgroundColor: "#010409",
                  color: "white",
                  width: "12rem",
                  border: "1px solid #30363d",
                  borderRadius: "0.6rem",
                  padding: "0.4rem",
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/createRepo"
                onClick={() => setAnchorAdd(null)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#21262d",
                    color: "#fff",
                    borderRadius: 2,
                  },
                }}
              >
                New Repository
              </MenuItem>

              <MenuItem
                component={Link}
                to="/createIssue"
                onClick={() => setAnchorAdd(null)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#21262d",
                    color: "#fff",
                    borderRadius: 2,
                  },
                }}
              >
                New Issue
              </MenuItem>
            </Menu>

            <IconButton
              component={Link}
              to={"/"}
              sx={{ border: "1px solid #30363d" }}
            >
              <NotificationsIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Avatar
              src="../../assets/github-mark-white.svg"
              sx={{ width: 35, height: 35, cursor: "pointer" }}
              onClick={handleOpen}
            />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              sx: {
                backgroundColor: "#010409",
                color: "white",
                width: "18rem",
                border: "1px solid #30363d",
                borderRadius: "0.8rem",
                padding: "0.7rem",
              },
            }}
          >
            <Box sx={{ padding: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {userDetails.email}
              </Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "#8b949e" }}>
                {userDetails.username}
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "#30363d" }} />

            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/profile"
            >
              Profile
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/allRepos"
            >
              Repositories
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to={`/${userDetails.username}/starRepo`}
            >
              Stars
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/"
            >
              Organizations
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/"
            >
              Enterprises
            </MenuItem>

            <Divider sx={{ borderColor: "#30363d" }} />

            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/"
            >
              Settings
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/"
            >
              Appearance
            </MenuItem>
            <MenuItem
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#fff",
                },
              }}
              component={Link}
              to="/"
            >
              Accessibility
            </MenuItem>

            <Divider sx={{ borderColor: "#30363d" }} />

            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                setCurrentUser(null);

                window.location.href("/login");
              }}
              sx={{
                color: "#f00",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                  color: "#f00",
                },
              }}
              component={Link}
              to="/"
            >
              Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* LEFT DRAWER */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#010409",
            color: "#fff",
            width: "20rem",
            padding: "0.8rem",
            borderRight: "1px solid #30363d",
            borderRadius: "0 1rem 1rem 0",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            gap: 2,
          }}
        >
          <GitHubIcon sx={{ fontSize: 35 }} />
          <IconButton onClick={() => setOpenDrawer(false)}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={"/"}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={"/allIssues"}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                },
              }}
            >
              <ListItemIcon>
                <RadioButtonUncheckedIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItemButton>
          </ListItem>

          {[
            "Pull requests",
            "Projects",
            "Discussions",
            "Codespaces",
            "Copilot",
          ].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#21262d",
                  },
                }}
              >
                <ListItemIcon>
                  <RadioButtonUncheckedIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: "#30363d" }} />

        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={"/"}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                },
              }}
            >
              <ListItemIcon>
                <ExploreIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={"/"}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                },
              }}
            >
              <ListItemIcon>
                <StoreIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Marketplace" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={"/"}
              sx={{
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#21262d",
                },
              }}
            >
              <ListItemIcon>
                <CategoryIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="MCP registry" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
