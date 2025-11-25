import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Navbar from "../navbar";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import githubLogo from "../../assets/github-mark-white.svg";
import gitpfp from "../../assets/git_pfp.jpg";
import { useSearch } from "../../SearchContext";
import server from "../../environment";

import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [userDetails, setUserDetails] = useState({ username: "Md Irfan" });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchHomeResults, setSearchHomeResults] = useState([]);

  const { globalSearch } = useSearch();

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

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`${server}/repo/user/${userId}`);
        setRepositories(response.data.repositories);
        setSearchResults(response.data.repositories);
      } catch (err) {
        console.error("Error while fetching repositories : ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await axios.get(`${server}/repo/all`);
        setSuggestedRepositories(response.data);
      } catch (err) {
        console.error("Error while fetching suggested repositories : ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  // SEARCH FILTER LOGIC
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  // Search Filter For Home

  useEffect(() => {
    if (globalSearch === "") {
      setSearchHomeResults(suggestedRepositories);
    } else {
      const filtered = suggestedRepositories.filter((repo) =>
        repo.name.toLowerCase().includes(globalSearch.toLowerCase())
      );
      setSearchHomeResults(filtered);
    }
  }, [globalSearch, suggestedRepositories]);

  return (
    <>
      <Navbar />
      <section id="dashboard">
        {/* left Dashboard / Top repositories */}
        <aside id="dashboard-left" sx={{ border: " 1px solid #30363d" }}>
          <div className="topRepo">
            <h5>Top Repositories</h5>
            <Link to={"/createRepo"} className="topRepoIcon">
              <AddIcon className="icon" />
              <p>New</p>
            </Link>
          </div>

          <div id="search-left">
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              placeholder="Find a repository..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {searchResults.map((repo) => (
            <div key={repo._id}>
              <h4
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={gitpfp}
                  alt="GitHub Logo"
                  style={{
                    width: 20,
                    marginRight: "0.5rem",
                    borderRadius: "1.25rem",
                  }}
                />
                {userDetails.username}/{repo.name}
              </h4>
            </div>
          ))}
        </aside>

        {/* Home Section  */}
        <main id="dashboard-main">
          <h2>Home</h2>

          {searchHomeResults.map((repo) => (
            <Card
              sx={{
                width: "100%",
                border: "1px solid #30363d",
                backgroundColor: "#0D1117",
                color: "#fff",
                marginBottom: "2rem",
                borderRadius: "0.8rem",
              }}
              key={repo._id}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {repo.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  {repo.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Repository</Button>
              </CardActions>
            </Card>
          ))}
        </main>

        {/* changelog Events  */}
        <aside id="dashboard-right">
          <Card
            sx={{
              width: "100%",
              border: "1px solid #30363d",
              backgroundColor: "#0D1117",
              color: "#fff",
              marginBottom: "2rem",
              borderRadius: "0.8rem",
            }}
          >
            <CardContent>
              <Typography
                gutterBottom
                variant="p"
                component="div"
                sx={{ fontWeight: "500" }}
              >
                Latest from our changelog!
              </Typography>

              <Box
                sx={{
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  transition: "0.2s ease",
                  "&:hover": {
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography sx={{ color: "#494f56ff", fontWeight: "500" }}>
                  Nov 25
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: "200" }}
                >
                  Tech Conference
                </Typography>
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    marginTop: "0.3rem",
                  }}
                >
                  A global event focused on AI, cloud, and cutting-edge
                  technologies.
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  transition: "0.2s ease",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography sx={{ color: "#494f56ff", fontWeight: "500" }}>
                  Dec 5
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: "200" }}
                >
                  Developer Meetup
                </Typography>
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    marginTop: "0.3rem",
                  }}
                >
                  Meet developers, share ideas, and collaborate on open-source
                  projects.
                </Typography>
              </Box>

              <Box
                sx={{
                  padding: "0.6rem",
                  borderRadius: "0.5rem",
                  transition: "0.2s ease",
                  marginTop: "1rem",
                  "&:hover": {
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography sx={{ color: "#494f56ff", fontWeight: "500" }}>
                  Jan 25
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontSize: "0.9rem", fontWeight: "200" }}
                >
                  React Summit
                </Typography>
                <Typography
                  sx={{
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                    marginTop: "0.3rem",
                  }}
                >
                  A deep-dive into modern React, performance patterns, and best
                  practices.
                </Typography>
              </Box>
            </CardContent>

            <CardActions>
              <Button size="small">View changelog</Button>
            </CardActions>
          </Card>
        </aside>
      </section>
    </>
  );
}

export default Dashboard;
