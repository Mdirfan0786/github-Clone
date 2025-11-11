const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const stagingPath = path.join(repoPath, "staging");

  try {
    const fileName = path.basename(filePath);

    await fs.mkdir(stagingPath, { recursive: true });
    await fs.copyFile(filePath, path.join(stagingPath, fileName));

    console.log(`file ${fileName} added to the staging area`);
  } catch (err) {
    console.error("Error adding file : ", err);
  }
}

module.exports = { addRepo };
