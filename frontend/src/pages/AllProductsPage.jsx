import { useProductStore } from "../stores/useProductStore";
import ItemPreview from "../components/ItemPreview";
import { useEffect, useState } from "react";

// const products = [
//   // another array of product objects
//   {
//     id: 5,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 6,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 7,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 8,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 9,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 10,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 11,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 12,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 13,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 14,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 15,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
//   {
//     id: 16,
//     name: "Garam Masala 100g",
//     price: "550",
//     originalPrice: "750",
//     rating: 4,
//     imageUrl:
//       "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
//   },
// ];

const AllProductsPage = () => {
  const { products, fetchAllProducts } = useProductStore();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const generateOriginalPrice = (price) => {
    const fivePercentage = price * 0.05; // 0.05 gives a 5% margin
    const originalPrice = price + fivePercentage;
    // Round the originalPrice to the nearest integer
    return Math.round(originalPrice); // rounds to the nearest whole number
  };

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products // Show all products if "All" is selected
      : products?.filter((product) => product?.category === selectedCategory);

  return (
    <div className="bg-white p-4 shadow-lg mt-4 lg:mx-64 md:mx-24">
      {/* Flex container to align heading and category selection */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">ALL PRODUCTS</h2>

        {/* Category dropdown positioned to the right */}
        <div className="w-40">
          <label
            htmlFor="Category"
            className="block text-sm font-medium text-gray-900 mb-1"
          >
            Category
          </label>
          <select
            id="Category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="All">All</option>
            <option value="Herbs">Herbs</option>
            <option value="Spices">Spices</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredProducts?.map((product) => (
          <ItemPreview
            productId={product._id}
            key={product._id}
            name={product.name}
            price={product.ps[0].price}
            stock={product.stock}
            originalPrice={generateOriginalPrice(product.ps[0].price)}
            rating={product.overAllRating || 0}
            ratingCount={product.rating.length}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;
