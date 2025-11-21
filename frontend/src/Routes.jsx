import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages

import Dashboard from "./components/daashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CreateRepo from "./components/repo/CreateRepo";
import StarRepo from "./components/repo/starRepo";
import NewIssue from "./components/issue/NewIssue";
import Issues from "./components/issue/Issues";
import Repositories from "./components/repo/Repositories";

// Auth Context

import { useAuth } from "./authContext";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }

    if (userIdFromStorage && window.location.pathname == "/login") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/allRepos",
      element: <Repositories />,
    },
    {
      path: "/createRepo",
      element: <CreateRepo />,
    },
    {
      path: "/:username/starRepo",
      element: <StarRepo />,
    },
    {
      path: "/createIssue",
      element: <NewIssue />,
    },
    {
      path: "/allIssues",
      element: <Issues />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
