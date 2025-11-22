let IS_PROD = true;
const server = IS_PROD
  ? "https://github-clone-backend-hbpl.onrender.com"
  : "http://localhost:8000";

export default server;
