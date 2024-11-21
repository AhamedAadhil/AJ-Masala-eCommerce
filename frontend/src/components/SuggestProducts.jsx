import { useProductStore } from "../stores/useProductStore";
import ItemPreview from "./ItemPreview";

const SuggestProducts = () => {
  const { suggestProducts } = useProductStore();

  const generateOriginalPrice = (price) => {
    const fivePercentage = price * 0.05; // 0.05 gives a 5% margin
    const originalPrice = price + fivePercentage;
    // Round the originalPrice to the nearest integer
    return Math.round(originalPrice); // rounds to the nearest whole number
  };

  return (
    <div>
      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {suggestProducts.map((product) => (
          <ItemPreview
            productId={product._id}
            key={product._id}
            name={product.name}
            price={product.ps?.[0]?.price || 0}
            stock={product.stock}
            originalPrice={generateOriginalPrice(product.ps?.[0]?.price || 0)}
            rating={product.overAllRating || 0}
            ratingCount={product.rating?.length || 0}
            imageUrl={product.images?.[0]}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestProducts;
