import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  CreditCard,
  Landmark,
} from "lucide-react";

import { Helmet } from "react-helmet";

import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import ReviewCard from "../components/ReviewCard";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import LoadingSpinner from "../components/LoadingSpinner";
import SuggestProducts from "../components/SuggestProducts";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, getSingleProduct, loading, fetchSuggestProducts } =
    useProductStore();
  const { user } = useUserStore();
  const { addToCart, checkOut } = useCartStore();

  const [activeImg, setActiveImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(1);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const openRegisterModal = () => {
    setRegisterModalOpen(true);
    setLoginModalOpen(false);
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
    setRegisterModalOpen(false);
  };
  const closeRegisterModal = () => setRegisterModalOpen(false);
  const closeLoginModal = () => setLoginModalOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    getSingleProduct(id);
  }, [getSingleProduct, id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product?.images[0]); // Set the initial active image
      setSelectedPrice(product?.ps[0]?.price); // Set the initial price
    }
  }, [product]); // This will run when `product` is updated

  useEffect(() => {
    fetchSuggestProducts();
  }, [fetchSuggestProducts]);

  const handleSizeChange = (price) => {
    setSelectedPrice(price);
  };

  // Handle add to cart action
  const handleAddToCart = () => {
    if (!user) {
      setLoginModalOpen(true); // Open modal if no user is logged in
    } else {
      addToCart(product._id, quantity, selectedPrice);
    }
  };

  const handleCheckoutSummary = () => {
    if (!user) {
      setLoginModalOpen(true); // Open modal if no user is logged in
    } else {
      const productsToCheckout = [
        {
          _id: product._id,
          productId: {
            _id: product._id,
          },
          name: product.name,
          image: product.images[0],
          quantity: quantity,
          unitPrice: selectedPrice,
        },
      ];
      checkOut(productsToCheckout, navigate);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-start p-10 bg-slate-50 shadow-sm lg:mx-60 border-l-2 border-r-2 border-b-2 rounded-b-xl">
        {/* SEO CODE WITH HELMET */}
        <Helmet>
          <title>
            {product?.name ? `${product.name} - AJ Foods` : "AJ Foods"}
          </title>
          <link rel="canonical" href={`https://ajfoods.lk/product/${id}`} />
          <meta
            name="description"
            content={
              product?.name
                ? `Buy ${
                    product.name
                  } at AJ Foods. ${product?.description?.slice(0, 150)}...`
                : "Explore premium spices, masalas, and groceries at AJ Foods."
            }
          />
          <meta
            name="keywords"
            content={`AJ Foods, spices, masalas${
              product?.name ? `, ${product.name}` : ""
            }, online grocery`}
          />
          <meta
            property="og:title"
            content={product?.name ? `${product.name} - AJ Foods` : "AJ Foods"}
          />
          <meta
            property="og:description"
            content={
              product?.name
                ? `Explore premium ${
                    product.name
                  } at AJ Foods. ${product?.description?.slice(0, 150)}...`
                : "Explore premium spices, masalas, and groceries at AJ Foods."
            }
          />
          <meta
            property="og:image"
            content={product?.images?.[0] || "URL_to_default_image"}
          />
          <meta
            property="og:url"
            content={
              product?._id
                ? `https://www.ajfoods.lk/product/${product._id}`
                : "https://www.ajfoods.lk"
            }
          />
        </Helmet>

        <div className="flex flex-col gap-6 lg:w-2/4 content-center">
          <img
            src={activeImg}
            alt={product?.name}
            className="w-full h-full aspect-square object-cover rounded-xl"
          />
          <div className="flex gap-2 flex-row justify-around overflow-scroll h-24">
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product?.name}
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
          <div className="hidden sm:block">
            <ReviewCard reviews={product?.rating} />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/4 md:w-full">
          <div>
            <span className=" text-orange-400 font-semibold">
              AJ Masalsa&apos;s
            </span>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
          </div>
          <h6 className="text-2xl font-semibold">
            Rs. {selectedPrice?.toFixed(2)}
          </h6>

          <div className="flex sm:w-full items-center py-2 overflow-x-scroll">
            <label className="cursor-pointer">
              <span className="px-3 py-1 text-sm font-medium mr-2">Size</span>
            </label>
            {product?.ps?.map((option, index) => (
              <label key={index} className="cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  className="sr-only peer"
                  onChange={() => handleSizeChange(option.price)}
                  checked={option.price === selectedPrice}
                />
                <span className="px-3 py-1 border rounded text-sm font-medium mr-2 peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-yellow-800 transition-colors">
                  {option.size}
                </span>
              </label>
            ))}
          </div>

          {/* Stock Indicator and Progress Bar in between 1 to 10 */}
          {product?.stock > 0 && product?.stock < 10 && (
            <div className="flex flex-col gap-2">
              <div className="text-red-600 font-semibold">
                Hurry! Only {product?.stock} left in stock.
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(product?.stock / 10) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            {product?.stock === 0 ? (
              // Out of Stock Message
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center">
                <strong className="font-bold">Out of Stock!</strong>
                <span className="block sm:inline">
                  {" "}
                  This product is currently unavailable. We’ll restock soon.
                  Stay tuned!
                </span>
              </div>
            ) : (
              // Quantity Buttons and AddToCart/BuyNow Buttons
              <>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 py-1.5 px-4 rounded-lg text-violet-800 text-xl lg:text-2xl"
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    -
                  </button>
                  <span className="py-3 px-4 rounded-lg text-base lg:text-lg">
                    {quantity}
                  </span>
                  <button
                    className="bg-gray-200 py-1.5 px-4 rounded-lg text-violet-800 text-xl lg:text-2xl"
                    onClick={() =>
                      setQuantity((prev) =>
                        prev < product.stock ? prev + 1 : prev
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex justify-center items-center bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition duration-300 text-sm lg:text-base whitespace-nowrap min-w-[110px]"
                  >
                    <span>Add to Cart</span>
                    <ShoppingCart className="ml-2" size={18} />
                  </button>
                  <button
                    onClick={handleCheckoutSummary}
                    className="flex justify-center items-center bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300 text-sm lg:text-base whitespace-nowrap min-w-[110px]"
                  >
                    <span>Buy Now</span>
                    <ShoppingBag className="ml-2" size={18} />
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="text-orange-700 font-bold">Description</div>
          <div
            dangerouslySetInnerHTML={{ __html: product?.description }}
            className="text-gray-700 text-justify"
          />

          {/* Bottom Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-start bg-orange-200 p-2 shadow rounded-md text-xs md:text-sm lg:text-base whitespace-nowrap overflow-x-auto flex-wrap">
              <span className="font-semibold text-xs md:text-sm mr-2 lg:mr-3 md:inline ">
                We Accept
              </span>
              <div className="flex flex-row items-center space-x-2 flex-wrap">
                <CreditCard
                  size={20}
                  className="text-blue-600 text-base md:text-lg lg:text-xl"
                />
                <span className="mr-2 lg:mr-3 hidden md:inline">
                  Pay online
                </span>
                <DollarSign
                  size={20}
                  className="text-green-600 text-base md:text-lg lg:text-xl"
                />
                <span className="mr-2 lg:mr-3 hidden md:inline">
                  Cash on delivery
                </span>
                <Landmark
                  size={20}
                  className="text-orange-500 text-base md:text-lg lg:text-xl"
                />
                <span className="hidden md:inline">Bank deposit</span>
              </div>
            </div>

            <div className="bg-orange-200 p-3 shadow rounded-md">
              <span className="font-semibold text-xs md:text-sm lg:text-base">
                We Deliver Island wide in 3–5 working days
              </span>
            </div>
          </div>
        </div>
        {/* Display ReviewCard after the Bottom Section for mobile */}
        <div className="sm:hidden mt-4">
          <ReviewCard reviews={product?.rating} />
        </div>
        {/* Register and Login Modals */}
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={closeRegisterModal}
          onOpenLogin={openLoginModal}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onOpenRegister={openRegisterModal}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 p-10 bg-slate-50 shadow-sm lg:mx-60 border-2 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800">People Also Buy</h2>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <SuggestProducts />
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
