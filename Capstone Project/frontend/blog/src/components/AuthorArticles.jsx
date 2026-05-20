// File: Capstone Project/frontend/blog/src/components/AuthorArticles.jsx | Description: Author Articles
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
const API = import.meta.env.VITE_API_URL;
import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${API}/author-api/articles`, { withCredentials: true });
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  // Soft-delete the article
  const deleteArticle = async (article) => {
    try {
      const res = await axios.put(
        `${API}/author-api/article`,
        { articleId: article._id, isArticleActive: false },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // Update UI instantly without refetching
        setArticles((prev) =>
          prev.map((a) =>
            a._id === article._id ? { ...a, isArticleActive: false } : a
          )
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete article");
    }
  };

  // Restore a deleted article
  const restoreArticle = async (article) => {
    try {
      const res = await axios.put(
        `${API}/author-api/article`,
        { articleId: article._id, isArticleActive: true },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setArticles((prev) =>
          prev.map((a) =>
            a._id === article._id ? { ...a, isArticleActive: true } : a
          )
        );
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to restore article");
    }
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div key={article._id} className={`${articleCardClass} relative flex flex-col`}>
          {/* Status Badge */}
          <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>

          <div className="flex flex-col gap-2">
            <p className={articleMeta}>{article.category}</p>
            <p className={articleTitle}>{article.title}</p>
            <p className={articleExcerpt}>{article.content.slice(0, 60)}...</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-auto pt-4">
            <button className={`${ghostBtn}`} onClick={() => openArticle(article)}>
              Read Article →
            </button>

            {article.isArticleActive ? (
              <button
                className="px-4 py-2 text-sm text-red-500 border border-red-400 rounded-full hover:bg-red-500 hover:text-white transition"
                onClick={() => deleteArticle(article)}
              >
                Delete Article
              </button>
            ) : (
              <button
                className="px-4 py-2 text-sm text-green-600 border border-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
                onClick={() => restoreArticle(article)}
              >
                Restore Article
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
