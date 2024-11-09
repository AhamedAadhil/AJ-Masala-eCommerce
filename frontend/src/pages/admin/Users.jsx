import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, Search } from "lucide-react";

import { useUserStore } from "../../stores/useUserStore";

const Users = () => {
  const { users, getAllUsers, loading } = useUserStore();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [orderBy, setOrderBy] = useState("lastLogin");

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Sorting function based on the orderBy state
  const sortedUsers = [...users].sort((a, b) => {
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

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto p-4">
      {/* Search bar and Order By dropdown */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
          <Search className="text-gray-400 h-5 w-5 mr-2" />
          <input
            type="text"
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
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                User Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700 cursor-pointer">
            {currentUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {new Date(user.createdAt).toISOString().split("T")[0]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {
                      new Date(parseInt(user.lastLogin))
                        .toISOString()
                        .replace("T", " ")
                        .split(".")[0]
                    }
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-blue-500">
                    <Eye className="h-5 w-5" />
                  </button>
                </td>
              </tr>
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
