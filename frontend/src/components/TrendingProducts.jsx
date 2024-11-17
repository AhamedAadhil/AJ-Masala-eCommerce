/* eslint-disable react/prop-types */
import ItemPreview from "./ItemPreview";

const TrendingProducts = ({ products }) => {
  const generateOriginalPrice = (price) => {
    const fivePercentage = price * 0.05; // 0.05 gives a 5% margin
    const originalPrice = price + fivePercentage;
    // Round the originalPrice to the nearest integer
    return Math.round(originalPrice); // rounds to the nearest whole number
  };
  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3">TRENDING PRODUCTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ItemPreview
            productId={product._id}
            key={product._id}
            name={product.name}
            price={product.ps[0].price}
            originalPrice={generateOriginalPrice(product.ps[0].price)}
            rating={product.overAllRating}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};
export default TrendingProducts;
