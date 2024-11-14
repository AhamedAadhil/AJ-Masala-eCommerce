import { Star, Edit, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../stores/useProductStore";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { products, updateProduct, loading, fetchAllProducts } =
    useProductStore();

  const handleUpdate = (productId, data) => {
    updateProduct(productId, data, fetchAllProducts);
    fetchAllProducts();
  };

  // Filter products based on search term
  const filteredProducts = products?.filter((product) =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  console.log("products", products);

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
                  <div className="flex gap-2 text-sm text-white">
                    {product?.stock || 0}{" "}
                    <span
                      className={
                        product.stock === 0
                          ? "text-red-500" // Out of stock
                          : product.stock > 0 && product.stock <= 10
                          ? "text-yellow-500" // Low stock
                          : "text-green-500" // In stock
                      }
                    >
                      {product.stock === 0
                        ? "(Out of stock)"
                        : product.stock > 0 && product.stock <= 10
                        ? "(Low stock)"
                        : "(In stock)"}
                    </span>
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
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Edit
                        onClick={() =>
                          navigate(`/admin/update-product/${product._id}`)
                        }
                        className="h-5 w-5"
                      />
                    </button>
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
