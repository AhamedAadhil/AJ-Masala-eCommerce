import { useEffect } from "react";

import TrendingProducts from "../components/TrendingProducts";
import BannerCarousel from "../components/BannerCarousel";
import AllProducts from "../components/AllProducts";

import { useProductStore } from "../stores/useProductStore";

const HomePage = () => {
  const { products, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const featuredProducts = products.filter((product) => product.isFeatured);

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
