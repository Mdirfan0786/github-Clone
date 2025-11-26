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

    const user = await User.findById(owner);
    if (!user) {
      return res.status(404).json({ error: "Owner not found!" });
    }

    user.repositories.push(result._id);
    await user.save();

    res.status(201).json({
      message: "Repository Created!",
      repositoryID: result._id,
    });
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
  const { userID } = req.params;

  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length === 0) {
      return res.status(404).json({ error: "user repositories not found!" });
    }

    res.json({ message: "repositories found!", repositories });
  } catch (err) {
    console.error("Error while fetching user reositories : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    if (content) {
      repository.content.push(content);
    }

    if (description) {
      repository.description = description;
    }

    const updatedRepo = await repository.save();

    res.json({
      message: "Repository update Successfully!",
      repository: updatedRepo,
    });
  } catch (err) {
    console.error("Error while fetching repository : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    repository.visibility = !repository.visibility;
    const updatedRepo = await repository.save();

    res.json({
      message: "Repository toggled Successfully!",
      repository: updatedRepo,
    });
  } catch (err) {
    console.error("Error while togling repository : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findByIdAndDelete(id);

    if (!repository) {
      return res.status(404).json({ message: "Repository not found!" });
    }

    await User.findByIdAndUpdate(repository.owner, {
      $pull: { repositories: repository._id },
    });

    res.json({ message: "Repository deleted Successfully!" });
  } catch (err) {
    console.error("Error while deleting repository : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

// starred repository

async function toggleStarRepo(req, res) {
  const { repoId } = req.params;
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    const repo = await Repository.findOne({ _id: repoId });

    if (!repo) {
      return res.status(404).json({ message: "Repository not found!" });
    }

    const isStarred = user.starRepos.includes(repoId);

    if (isStarred) {
      user.starRepos = user.starRepos.filter((id) => id.toString() !== repoId);
    } else {
      user.starRepos.push(repoId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      starred: !isStarred,
    });
  } catch (err) {
    console.error("Error while toggling starRepo : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
}

async function getStarredRepositories(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("starRepos");

    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    res.status(200).json(user.starRepos);
  } catch (err) {
    console.error("Error while getting Starred Repositories! : ", err.message);
    res.status(500).json({ message: "Server Error!" });
  }
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
  toggleStarRepo,
  getStarredRepositories,
};
