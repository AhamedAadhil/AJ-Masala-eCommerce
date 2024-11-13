import React from 'react'
import ItemPreview from "../components/ItemPreview";

const products = [
  // another array of product objects
  {
    id: 5,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 6,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 7,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 8,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 9,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 10,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 11,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 12,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 13,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 14,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 15,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 16,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
];

const AllProductsPage = () => {
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
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="EP">All</option>
            <option value="NP">Masala</option>
            <option value="NW">Seeds</option>
            <option value="NC">Other</option>
          </select>
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ItemPreview
            key={product.id}
            name={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            rating={product.rating}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default AllProductsPage