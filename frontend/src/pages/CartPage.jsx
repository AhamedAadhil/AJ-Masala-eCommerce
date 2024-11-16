import { useEffect, useState } from "react";
import { Trash2, Frown } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const { getUserCart, cart, totalAmount, removeProductFromCart, checkOut } =
    useCartStore();
  const [products, setProducts] = useState([]);

  // Function to handle product removal
  const handleRemoveProduct = (id) => {
    removeProductFromCart(id);
  };

  const handleCheckoutSummary = () => {
    // Transform the products array
    const updatedProducts = products.map((product) => ({
      ...product,
      _id: product.productId._id, // Replace _id with productId._id
    }));

    checkOut(updatedProducts, navigate);
  };

  useEffect(() => {
    getUserCart(); // Fetch user cart
  }, [getUserCart]);

  useEffect(() => {
    if (cart && Array.isArray(cart)) {
      setProducts(cart); // Set products from cart
    }
  }, [cart]);

  return (
    <section className="bg-white rounded-md shadow-md lg:mt-4 lg:px-4 py-4 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Cart</h2>

        {/* Show message if cart is empty */}
        {products?.length === 0 ? (
          <div className="text-center py-10 flex flex-col items-center justify-center">
            <Frown size={50} className="mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              Your cart is empty. Start shopping now!
            </h3>
            <p className="text-gray-500 mt-4">
              Browse our collection and add products to your cart.
            </p>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="mt-6 w-full max-w-xs rounded-lg bg-blue-500 px-5 py-2 text-white font-medium hover:bg-blue-700"
            >
              Shop Now
            </button>
          </div>
        ) : (
          // Display cart items if products are available
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {products?.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
              >
                {/* Product Image */}
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="h-16 w-16 rounded-md object-cover"
                />

                {/* Product Details */}
                <div className="flex-1 px-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {product?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    LKR {product?.unitPrice?.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">X {product?.quantity}</p>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveProduct(product.productId._id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Summary Section */}
        {products?.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-xl font-semibold text-gray-900">Summary</h3>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Subtotal</span>
              <span>LKR {totalAmount?.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckoutSummary}
              type="button"
              className="mt-4 w-full rounded-lg bg-blue-500 px-5 py-2 text-white font-medium hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
