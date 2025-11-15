const getAllUsers = (req, res) => {
  res.send("fetching all users...");
};

const signUp = (req, res) => {
  res.send("sigin...");
};

const login = (req, res) => {
  res.send("Login...");
};

const getUserProfile = (req, res) => {
  res.send("fetching all users profile...");
};

const updateUserProfile = (req, res) => {
  res.send("update users profile...");
};

const deleteUserProfile = (req, res) => {
  res.send("delete users profile...");
};

module.exports = {
  getAllUsers,
  signUp,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
