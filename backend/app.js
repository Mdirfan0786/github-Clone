const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router.js");

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init.js");
const { addRepo } = require("./controllers/add.js");
const { commitRepo } = require("./controllers/commit.js");
const { pullRepo } = require("./controllers/pull.js");
const { pushRepo } = require("./controllers/push.js");
const { revertRepo } = require("./controllers/revert.js");
const { Socket } = require("dgram");

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Start a new Server", {}, startServer)
  .command("init", "initialize a new repository", {}, initRepo)
  .command(
    "add <file>",
    "add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )
  .command(
    "commit <message>",
    "commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )
  .command("pull", "pull commits from S3", {}, pullRepo)
  .command("push", "push commits to S3", {}, pushRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "commit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitID);
    }
  )
  .demandCommand(1, "You need atleast one command!")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(express.json());

  const mongoURL = process.env.MONGODB_URL;

  mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB Connected!"))
    .catch((err) => console.error("unable to connect db : ", err));

  app.use(cors({ origin: "*" }));

  app.use("/", mainRouter);

  let user = "test";

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (Socket) => {
    Socket.on("joinRoom", (userID) => {
      user = userID;
      console.log("========");
      console.log(user);
      console.log("========");

      Socket.join(user);
    });
  });

  const db = mongoose.connection;

  db.once("open", async (req, res) => {
    console.log("CRUD operation called");

    //CRUD operation
  });

  httpServer.listen(port, () => {
    console.log(`server listening on port ${port}`);
  });
}
