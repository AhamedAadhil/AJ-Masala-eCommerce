/* eslint-disable react/prop-types */
function UsersInfoTable({ data }) {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      <h3 className="text-lg mb-4">Top Users</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Total Orders</th>
            <th>Total Purchase</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, index) => (
            <tr key={index}>
              <td>{user.no}</td>
              <td>{user.name}</td>
              <td>{user.orders}</td>
              <td>{user.purchase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersInfoTable;
