const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGODB_URL;
let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(url);
    await client.connect();
  }
}

async function signUp(req, res) {
  const { username, password, email } = req.body;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username });
    if (user) {
      return res.status(400).json("user already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hasedPassword,
      email,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await usersCollection.insertOne(newUser);

    const token = jwt.sign({ id: result.insetId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token, userId: result.insetId });
  } catch (err) {
    console.error("Error during signup : ", err.message);
    res.status(500).json("server Error");
  }
}

const login = (req, res) => {
  res.send("Login...");
};

const getAllUsers = (req, res) => {
  res.send("fetching all users...");
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
