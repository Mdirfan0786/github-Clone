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
    console.error("Error while Repository creation : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function getAllRepositories(req, res) {
  try {
    const allRepos = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.send(allRepos);
  } catch (err) {
    console.error("Error while fetching repositories : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issues");

    res.send(repository);
  } catch (err) {
    console.error("Error while fetching repository : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repository = await Repository.find({ name })
      .populate("owner")
      .populate("issues");

    res.send(repository);
  } catch (err) {
    console.error("Error while fetching repository by name : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
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
