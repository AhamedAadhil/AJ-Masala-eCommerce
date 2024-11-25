import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet";

import BannerCarousel from "../components/BannerCarousel";
const ProductList = React.lazy(() => import("../components/ProductList"));

import { useProductStore } from "../stores/useProductStore";
import ProductPlaceholder from "../components/ProductLoadingPlacehoder";

const HomePage = () => {
  const { products, fetchAllProducts, loading } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const featuredProducts = products?.filter((product) => product?.isFeatured);

  return (
    <div className="lg:place-items-center">
      {/* React Helmet for SEO */}
      <Helmet>
        <title>AJ Foods - Premium Spices & Masalas</title>
        <meta
          name="description"
          content="Explore trending and premium spices from AJ Foods. Shop quality masalas for your recipes."
        />
        <meta
          property="og:title"
          content="AJ Foods - Premium Spices & Masalas"
        />
        <meta
          property="og:description"
          content="Discover premium and trending spices at AJ Foods. Enhance your cooking with our wide range of masalas."
        />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/arwxc4kk8/AJLogo.png"
        />
        <meta property="og:url" content="https://www.ajfoods.lk" />
      </Helmet>

      <div className="md:w-full lg:w-3/5 justify-items-center ">
        <BannerCarousel />
        <div className="mx-0 max-w-full">
          {/* Use Suspense with custom placeholder */}
          <Suspense
            fallback={
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <ProductPlaceholder />
                <ProductPlaceholder />
                <ProductPlaceholder />
                <ProductPlaceholder />
              </div>
            }
          >
            <ProductList
              title={"TrendingProducts"}
              products={featuredProducts}
              loading={loading}
            />
            <ProductList
              title={"All Products"}
              products={products}
              loading={loading}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
