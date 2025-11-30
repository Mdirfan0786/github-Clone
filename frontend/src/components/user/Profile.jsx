import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../navbar";
import { UnderlineNav } from "@primer/react";
import { BookIcon, RepoIcon } from "@primer/octicons-react";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";
import Box from "@mui/material/Box";
import Footer from "../../footer";
import server from "../../environment";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ username: "Md Irfan" });
  const { setCurrentUser } = useAuth();

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

  return (
    <>
      <Navbar />
      <Box
        sx={{ backgroundColor: "#010409", borderBottom: "1px solid #30363d" }}
      >
        <UnderlineNav aria-label="Repository">
          <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
            sx={{
              backgroundColor: "transparent",
              color: "white",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Overview
          </UnderlineNav.Item>

          <UnderlineNav.Item
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${userDetails.username}/starRepo`);
            }}
            icon={RepoIcon}
            sx={{
              backgroundColor: "transparent",
              color: "whitesmoke",
              "&:hover": {
                textDecoration: "underline",
                color: "white",
              },
            }}
          >
            Starred Repositories
          </UnderlineNav.Item>
        </UnderlineNav>
      </Box>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setCurrentUser(null);

          window.location.href = "/login";
        }}
        style={{ position: "fixed", bottom: "50px", right: "50px" }}
        id="logout"
      >
        Logout
      </button>

      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>

        <div className="heat-map-section">
          <HeatMapProfile />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
