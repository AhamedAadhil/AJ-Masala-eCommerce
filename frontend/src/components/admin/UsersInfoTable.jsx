/* eslint-disable react/prop-types */
function UsersInfoTable({ data }) {
  // Sort products based on stock, lowest stock first
  // const sortedData = data?.sort((a, b) => a.stock - b.stock);

  console.log("from user tabel", data);
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Top Users</h3>
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-600">
          <tr>
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">User Email</th>
            <th className="py-2 px-4">Total Orders</th>
            <th className="py-2 px-4">Total Purchase</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } hover:bg-gray-500 transition-colors duration-200`}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.totalOrders}</td>
              <td className="py-2 px-4">{user.totalPurchase.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersInfoTable;
