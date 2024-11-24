/* eslint-disable react/prop-types */
import ItemPreview from "./ItemPreview";

const ProductList = ({ title, products, loading }) => {
  const generateOriginalPrice = (price) => {
    const fivePercentage = price * 0.05; // 5% margin
    const originalPrice = price + fivePercentage;
    return Math.round(originalPrice); // round to nearest integer
  };

  const placeholders = Array.from({ length: products?.length || 0 }); // Number of placeholders

  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {loading
          ? placeholders?.map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-gray-100 rounded-2xl shadow-lg p-4"
              >
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))
          : products?.map((product) => (
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

export default ProductList;
