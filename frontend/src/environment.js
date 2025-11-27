const server =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://github-clone-backend-hbpl.onrender.com";

export default server;
