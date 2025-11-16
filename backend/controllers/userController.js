const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

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

  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist!" });
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

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.send({ token, userId: result.insertedId });
  } catch (err) {
    console.error("Error during signup : ", err.message);
    res.status(500).json({ message: "server Error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email and username are required!" });
  }

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ token, userId: user._id });
  } catch (err) {
    console.error("Error during Login : ", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.find({}).toArray();
    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getUserProfile(req, res) {
  const { id } = req.params;

  try {
    await connectClient();
    const db = client.db("githubclone");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.send(user);
  } catch (err) {
    console.error("Error during fetching : ", err.message);
    res.status(500).json({ message: "Server Error" });
  }
}

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
