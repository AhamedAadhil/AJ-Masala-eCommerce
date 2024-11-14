/* eslint-disable react/prop-types */
import ItemPreview from "./ItemPreview";

const AllProducts = ({ products }) => {
  console.log(products);
  const generateOriginalPrice = (price) => {
    // Generate a random factor between 1.1 and 1.5 (10% to 50% more expensive)
    const randomFactor = 1 + Math.random() * 0.4; // 0.4 gives a 40% margin
    const originalPrice = price * randomFactor;
    // Round the originalPrice to the nearest integer (you can adjust to two decimals if needed)
    return Math.round(originalPrice); // rounds to the nearest whole number
  };
  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3">ALL PRODUCTS</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ItemPreview
            key={product._id}
            name={product.name}
            price={product.ps[0].price}
            originalPrice={generateOriginalPrice(product.ps[0].price)}
            rating={product.overAllRating || 5}
            imageUrl={product.images[0]}
          />
        ))}
      </div>
    </div>
  );
};
export default AllProducts;
