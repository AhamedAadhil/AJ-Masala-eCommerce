import { Trash, Star, Edit, PlusCircle, Search } from "lucide-react";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../stores/useProductStore";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [updateData, setUpdateData] = useState({
  //     name: "",
  //     description: "",
  //     category: "",
  //     tags: "",
  //     images: [],
  //     ps: [{ price: "", size: "" }],
  //     stock: 0,
  //   });

  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct, loading, fetchAllProducts } =
    useProductStore();

  // Debounced version of handleUpdate to limit toggle requests
  const handleUpdate = useCallback(
    debounce((productId, data) => {
      updateProduct(productId, data, fetchAllProducts);
    }, 300), // 300ms delay
    []
  );

  // Filter products based on search term
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* Search bar and Create New Product button */}
      <div className="flex justify-between items-center p-4">
        {/* Search Input */}
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-2">
          <Search className="text-gray-400 h-5 w-5 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Create New Product Button */}
        <button
          disabled={loading}
          onClick={() => navigate("/admin/create-product")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Create New Product
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Stock Count
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700 cursor-pointer">
          {filteredProducts?.map((product) => {
            return (
              <tr key={product._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 "
                        src={product.images[0]}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">
                    {product?.stock || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      handleUpdate(product._id, {
                        isFeatured: !product.isFeatured,
                      });
                    }}
                    disabled={product.isUpdating}
                    className={`p-1 rounded-full  ${
                      product.isFeatured
                        ? "bg-green-500 text-gray-900"
                        : "bg-red-500 text-gray-50"
                    } hover:bg-yellow-500 transition-colors duration-200`}
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      disabled={loading || product.isUpdating}
                      //   onClick={() => updateProduct(product._id, {})}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    {/* <button
                      disabled={loading || product.isUpdating}
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash className="h-5 w-5" />
                    </button> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
