/* eslint-disable react/prop-types */
import ItemPreview from "./ItemPreview";

const AllProducts = ({ products }) => {
  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3">ALL PRODUCTS</h2>
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
  );
};
export default AllProducts;
