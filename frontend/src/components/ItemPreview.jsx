import React from 'react';
import { Star } from 'lucide-react';

const ItemPreview = ({ name, price, originalPrice, rating, imageUrl }) => {
  return (
    <div className="max-w-xs bg-white rounded overflow-hidden shadow-lg mx-2 my-4">
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="px-4 py-2">
        <h3 className="font-bold text-md mb-1">{name}</h3>
        <div className="flex text-sm mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`} />
          ))}
        </div>
        <div className="flex items-baseline">
          <span className="text-gray-900 font-semibold text-lg">Rs. {price}</span>
          <span className="text-gray-500 text-sm line-through ml-2">Rs. {originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;
