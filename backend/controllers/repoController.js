const createRepository = (req, res) => {
  res.send("repository Created!");
};

const getAllRepositories = (req, res) => {
  res.send("getting all repositories!");
};

const fetchRepositoryById = (req, res) => {
  res.send("fetching repository By Id... ");
};

const fetchRepositoryByName = (req, res) => {
  res.send("fetching repository By name... ");
};

const fetchRepositoriesForCurrentUser = (req, res) => {
  res.send("fetching repositories for current Users!");
};

const updateRepositoryById = (req, res) => {
  res.send("update repositories for current Users!");
};

const toggleVisibilityById = (req, res) => {
  res.send("toggle repositories for current Users!");
};

const deleteRepositoryById = (req, res) => {
  res.send("delete repositories for current Users!");
};

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
