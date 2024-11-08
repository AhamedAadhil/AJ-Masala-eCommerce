import TrendingProducts from "../components/TrendingProducts";
import BannerCarousel from "../components/BannerCarousel";
import AllProducts from "../components/AllProducts";

const sampleProducts = [
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
    id: 1,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
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
  {
    id: 1,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
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
  {
    id: 1,
    name: "Garam Masala 100g",
    price: "550",
    originalPrice: "750",
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

const HomePage = () => {
  return (
    <div className="lg:place-items-center">
      <div className="lg:w-1/2 justify-items-center ">
        <BannerCarousel />
        <div className="mx-0 max-w-full">
          <TrendingProducts products={sampleProducts} />
          <AllProducts products={allProducts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
