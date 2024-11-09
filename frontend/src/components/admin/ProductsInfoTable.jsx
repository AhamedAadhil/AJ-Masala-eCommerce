/* eslint-disable react/prop-types */
function ProductsInfoTable({ data }) {
  return (
    <div className="bg-gray-700 text-white p-4 rounded-lg">
      <h3 className="text-lg mb-4">Stock Info</h3>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>No</th>
            <th>Product Name</th>
            <th>Stocks</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product?.name}</td>
              <td>{product?.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsInfoTable;
