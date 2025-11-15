const createIssue = (req, res) => {
  res.send("issue Created!");
};

const updateIssueById = (req, res) => {
  res.send("issue Updated!");
};

const deleteIssueById = (req, res) => {
  res.send("issue deleted!");
};

const getAllIssues = (req, res) => {
  res.send("getting all issues...");
};

const getIssueById = (req, res) => {
  res.send("fetching issue details...");
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
