import { useEffect } from "react";

import TrendingProducts from "../components/TrendingProducts";
import BannerCarousel from "../components/BannerCarousel";
import AllProducts from "../components/AllProducts";

import { useProductStore } from "../stores/useProductStore";

const sampleProducts = [
  {
    id: 1,
    name: "Garam Masala 100g",
    price: "1550",
    originalPrice: "1750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 2,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 3,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
  {
    id: 4,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
    rating: 4,
    imageUrl:
      "https://www.abidarasheed.com/cdn/shop/products/Untitleddesign_1.png?v=1645255233",
  },
];
const allProducts = [
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

const HomePage = () => {
  const { products, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const featuredProducts = products.filter((product) => product.isFeatured);

  console.log(featuredProducts);

  return (
    <div className="lg:place-items-center">
      <div className="md:w-full lg:w-3/5 justify-items-center ">
        <BannerCarousel />
        <div className="mx-0 max-w-full">
          <TrendingProducts products={featuredProducts} />
          <AllProducts products={products} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
