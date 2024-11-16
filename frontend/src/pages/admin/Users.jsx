import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeClosed,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useUserStore } from "../../stores/useUserStore";

const Users = () => {
  const { users, getAllUsers, toggleUserStatus, loading } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("lastLogin");
  const [expandedUserId, setExpandedUserId] = useState(null);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const filteredUsers = users?.filter((user) =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (orderBy === "lastLogin") {
      return parseInt(b.lastLogin) - parseInt(a.lastLogin);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleUserDetails = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg max-w-4xl mx-auto p-4">
      {/* Search bar and Order By dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
          <Search className="text-gray-400 h-5 w-5 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="text-white mr-2">Order By:</label>
          <select
            className="bg-gray-700 text-white rounded-md p-2"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="lastLogin">Last Login</option>
            <option value="joined">Joined</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                User Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Joined
              </th>
              <th className="px-3 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-3 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Action
              </th>
              <th className="px-3 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700 cursor-pointer">
            {currentUsers.map((user, index) => (
              <>
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-3 py-4">
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-white">{user.email}</div>
                  </td>
                  <td className="px-3 py-4">
                    <div
                      className={`text-sm font-semibold ${
                        user.status === "active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {user.status}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-white">
                      {new Date(user.createdAt).toISOString().split("T")[0]}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-sm text-white">
                      {
                        new Date(user.lastLogin)
                          .toISOString()
                          .replace("T", " ")
                          .split(".")[0]
                      }
                    </div>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button className="text-gray-400 hover:text-blue-500">
                      {user.status === "active" ? (
                        <Eye
                          onClick={() => toggleUserStatus(user._id)}
                          className="h-5 w-5"
                        />
                      ) : (
                        <EyeClosed
                          onClick={() => toggleUserStatus(user._id)}
                          className="h-5 w-5"
                        />
                      )}
                    </button>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button
                      onClick={() => toggleUserDetails(user._id)}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      {expandedUserId === user._id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
                {/* Render extra details directly below the row */}
                {expandedUserId === user._id && (
                  <tr>
                    <td colSpan="7" className="px-3 py-4 bg-gray-700">
                      <div className="text-white">
                        <p>
                          <strong>Phone:</strong> {user.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {user.address?.street},{" "}
                          {user.address?.city}
                        </p>
                        <p>
                          <strong>Role:</strong> {user.role}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1 ? "text-gray-400" : "text-white hover:bg-gray-700"
          }`}
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400"
              : "text-white hover:bg-gray-700"
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Users;
