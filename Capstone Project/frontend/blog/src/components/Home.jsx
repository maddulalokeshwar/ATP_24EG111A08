import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/authStore";

const API = import.meta.env.VITE_API_URL;

function Home() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // No credentials needed — endpoint is now public
        const res = await axios.get(`${API}/user-api/articles`);
        setArticles(res.data.payload);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
        console.log(err.response?.data || err.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Latest Articles 📰</h1>

        {/* Prompt guests to log in; hidden if already authenticated */}
        {!isAuthenticated && (
          <p className="text-sm text-gray-500">
            <Link to="/login" className="text-blue-600 underline">
              Log in
            </Link>{" "}
            or{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>{" "}
            to comment on articles.
          </p>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {articles.length === 0 && !error && (
        <p className="text-gray-400">No articles yet. Check back soon!</p>
      )}

      {articles.map((a) => (
        <div
          key={a._id}
          className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/article/${a._id}`, { state: a })}
        >
          <h2 className="text-xl font-semibold">{a.title}</h2>
          <p className="text-gray-600">{a.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
