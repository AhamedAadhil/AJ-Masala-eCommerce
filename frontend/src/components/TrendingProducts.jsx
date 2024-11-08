import React from 'react';
import ItemPreview from './ItemPreview';

const TrendingProducts = ({ products }) => {
  return (
    <div className="bg-white p-4 shadow-lg mt-4">
      <h2 className="text-xl font-bold mb-3">TRENDING PRODUCTS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
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
export default TrendingProducts;