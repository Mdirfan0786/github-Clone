const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, description, content, visibility, issues } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID!" });
    }

    const newRepository = new Repository({
      owner,
      name,
      content,
      description,
      visibility,
      issues,
    });

    const result = await newRepository.save();
    res
      .status(201)
      .json({ message: "Repository Created!", repositoryID: result._id });
  } catch (err) {
    console.error("Error while creating Repository : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function getAllRepositories(req, res) {
  res.send("getting all repositories!");
}

async function fetchRepositoryById(req, res) {
  res.send("fetching repository By Id... ");
}

async function fetchRepositoryByName(req, res) {
  res.send("fetching repository By name... ");
}

async function fetchRepositoriesForCurrentUser(req, res) {
  res.send("fetching repositories for current Users!");
}

async function updateRepositoryById(req, res) {
  res.send("update repositories for current Users!");
}

async function toggleVisibilityById(req, res) {
  res.send("toggle repositories for current Users!");
}

async function deleteRepositoryById(req, res) {
  res.send("delete repositories for current Users!");
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
