const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
  const { title, description, repository } = req.body;

  try {
    const issue = new Issue({
      title,
      description,
      repository,
    });

    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    console.error("Error while issue creation : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function updateIssueById(req, res) {
  const { title, description, status } = req.body;
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found!" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();
    res.json(issue, { message: "issue updated!" });
  } catch (err) {
    console.error("Error while updating issue : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function deleteIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found!" });
    }

    res.json({ message: "issue delete Successfully!" });
  } catch (err) {
    console.error("Error while deleting issue : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function getAllIssues(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.find({ repository: id });

    if (!issue) {
      return res.status(404).json({ error: "issue not found!" });
    }

    res.status(200).json(issue);
  } catch (err) {
    console.error("Error while fetching all issue : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function getIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "issue not found!" });
    }

    res.json(issue);
  } catch (err) {
    console.error("Error while fetiching issue : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
