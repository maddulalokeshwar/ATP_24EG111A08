import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";

const API = import.meta.env.VITE_API_URL;

function AdminProfile() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin-api/users`, {
        withCredentials: true,
      });

      setUsers(res.data.payload);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (userId, currentStatus) => {
    try {
      await axios.put(
        `${API}/admin-api/user-status`,
        {
          userId,
          isActive: !currentStatus,
        },
        { withCredentials: true }
      );

      fetchUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API}/auth/logout`, {
        withCredentials: true,
      });

      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard 👑</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          className="border p-4 rounded-lg mb-3 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {user.FirstName} {user.LastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm">Role: {user.role}</p>
            <p className="text-sm">
              Status:{" "}
              {user.isUserActive ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-red-600">Blocked</span>
              )}
            </p>
          </div>

          <button
            onClick={() => toggleStatus(user._id, user.isUserActive)}
            className={`px-4 py-2 rounded text-white ${
              user.isUserActive ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {user.isUserActive ? "Block" : "Activate"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProfile;