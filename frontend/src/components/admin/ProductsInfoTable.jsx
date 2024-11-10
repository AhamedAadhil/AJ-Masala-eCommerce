/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
function ProductsInfoTable({ data }) {
  // Sort products based on stock, lowest stock first
  const sortedData = data?.sort((a, b) => a.stock - b.stock);

  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Stock Info</h3>
      <table className="w-full text-left table-auto">
        <thead className="bg-gray-600">
          <tr>
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Stocks</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((product, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } hover:bg-gray-500 transition-colors duration-200 cursor-pointer`}
              onClick={() => navigate(`update-product/${product._id}`)}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{product?.name}</td>
              <td className="py-2 px-4">{product?.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsInfoTable;
