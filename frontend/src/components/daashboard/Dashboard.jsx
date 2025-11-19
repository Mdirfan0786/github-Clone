import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/repo/user/${userId}`
        );
        setRepositories(response.data.repositories);
        setSearchResults(response.data.repositories); // default view
      } catch (err) {
        console.error("Error while fetching repositories : ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/repo/all");
        setSuggestedRepositories(response.data);
      } catch (err) {
        console.error("Error while fetching suggested repositories : ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  // SEARCH FILTER LOGIC
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery, repositories]);

  return (
    <section id="dashboard">
      <aside>
        <h3>Suggested Repositories</h3>

        <div id="search">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {suggestedRepositories.map((repo) => (
          <div key={repo._id}>
            <h4>{repo.name}</h4>
            <h4>{repo.description}</h4>
          </div>
        ))}
      </aside>

      <main>
        <h3>Your Repositories</h3>
        {searchResults.map((repo) => (
          <div key={repo._id}>
            <h4>{repo.name}</h4>
            <h4>{repo.description}</h4>
          </div>
        ))}
      </main>

      <aside>
        <h3>Upcoming Events!</h3>
        <ul>
          <li>
            <p>Tech Conference - Nov 25</p>
          </li>
          <li>
            <p>Developer Meetup - Dec 5</p>
          </li>
          <li>
            <p>React Summit - Jan 25</p>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default Dashboard;
