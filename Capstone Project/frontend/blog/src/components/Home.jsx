import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/user-api/articles",
          { withCredentials: true }
        );

        setArticles(res.data.payload);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Latest Articles 📰</h1>

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