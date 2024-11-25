/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";
import ItemPreview from "./ItemPreview";

const ProductList = ({ title, products, loading }) => {
  const generateOriginalPrice = (price) => {
    const fivePercentage = price * 0.05; // 5% margin
    const originalPrice = price + fivePercentage;
    return Math.round(originalPrice); // round to nearest integer
  };

  const placeholders = Array.from({ length: 4 }); // Number of placeholders (set to 4 for example)

  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{title} - AJ Foods</title>
        <meta
          name="description"
          content={`Browse best ${title} at AJ Foods!`}
        />
        <meta name="keywords" content={`AJ Foods, spices, masalas, ${title}`} />
        <meta property="og:title" content={`${title} - AJ Foods`} />
        <meta
          property="og:description"
          content={`Explore premium ${title} at AJ Foods.`}
        />
        <meta
          property="og:image"
          content="https://ik.imagekit.io/arwxc4kk8/AJLogo.png?updatedAt=1732525455454"
        />
        <meta property="og:url" content="https://www.ajfoods.lk" />
      </Helmet>

      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {loading ? (
          placeholders.map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-100 rounded-2xl shadow-lg p-4"
            >
              <div className="h-48 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))
        ) : products?.length > 0 ? (
          products.map((product) => (
            <ItemPreview
              productId={product?._id}
              key={product?._id}
              name={product?.name}
              price={product?.ps?.[0].price}
              stock={product?.stock}
              originalPrice={generateOriginalPrice(product?.ps?.[0].price) || 0}
              rating={product?.overAllRating || 0}
              ratingCount={product?.rating?.length}
              imageUrl={product?.images?.[0]}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
