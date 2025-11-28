import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./authContext.jsx";
import { SearchProvider } from "./SearchContext.jsx";
import ProjectRoutes from "./Routes.jsx";
import { HashRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <Router>
        <ProjectRoutes />
      </Router>
    </SearchProvider>
  </AuthProvider>
);
