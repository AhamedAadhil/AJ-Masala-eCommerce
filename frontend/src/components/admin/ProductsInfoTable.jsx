function ProductsInfoTable() {
  const users = [
    { no: 1, name: "Asaan Ameen", orders: 9, purchase: "22000 LKR" },
    { no: 2, name: "Ahamed Aathil", orders: 8, purchase: "19000 LKR" },
    // Add dummy data
  ];

  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      <h3 className="text-lg mb-4">Users Info</h3>
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
          {users.map((user, index) => (
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

export default ProductsInfoTable;
