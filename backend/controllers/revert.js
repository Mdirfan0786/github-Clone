const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);

    // checking CommitDir is exist or not
    const commitExist = await stat(commitDir).catch(() => null);

    if (!commitExist) {
      console.log(`Commit ${commitID} not found!`);
      return;
    }

    // empty commit checking - It won’t perform unnecessary overwrites when a commit is empty.
    const files = await readdir(commitDir);
    if (files.length === 0) {
      console.log(`Commit ${commitID} is empty.`);
      return;
    }

    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      const src = path.join(commitDir, file);
      const dest = path.join(parentDir, file);

      // Ensuring destination folder exists before copying
      await mkdir(path.dirname(dest), { recursive: true });
      await copyFile(src, dest);

      console.log(`Reverted file : ${file}`);
    }

    console.log(`Commit ${commitID} reverted Successfully!`);
  } catch (err) {
    console.error("unable to revert : ", err);
  }
}

module.exports = { revertRepo };
