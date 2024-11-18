import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { useCouponStore } from "../stores/useCouponStore";
import { useOrderStore } from "../stores/useOrderStore";

import CheckoutItems from "../components/CheckoutItems";
// import PaymentSuccessModal from "../components/PaymentSuccessModal";
import OrderPlacedModal from "../components/OrderPlacedModal";
import UploadReceiptModal from "../components/UploadReceiptModal";
import { CreditCard, Truck, Upload } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { products, totalAmount } = useCartStore();
  const { user } = useUserStore();
  const { applyCoupon, discountAmount, totalAmountAfterDiscount } =
    useCouponStore();
  const { createOrder, orderId, loading, payWithPayhere } = useOrderStore();

  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("online"); // Default to 'online'
  const [couponApplied, setCouponApplied] = useState(false); // Flag to track if coupon is applied
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [imageBase64, setImageBase64] = useState(""); // To store Base64 URL
  const [deliveryDetails, setDeliveryDetails] = useState({
    mobileNumber: user?.phone || "",
    no: user?.address?.no || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    province: user?.address?.province || "EP",
    zipcode: user?.address?.zipcode || "",
  });

  // to handle coupon apply
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (couponCode === "") return;
    const isSuccess = await applyCoupon(couponCode.toUpperCase(), totalAmount);
    if (isSuccess) {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
  };

  //  to handle payment method change
  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // to handle order place
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if delivery details form is fully filled
    const { mobileNumber, no, street, city, province, zipcode } =
      deliveryDetails;
    if (!mobileNumber) {
      alert("Please enter the mobile number. ");
      return;
    } else if (!no) {
      alert("Please enter house number.");
      return;
    } else if (!street) {
      alert("Please enter street name.");
      return;
    } else if (!city) {
      alert("Please enter city name.");
      return;
    } else if (!province) {
      alert("Please select province.");
      return;
    } else if (!zipcode) {
      alert("Please enter zip/postal code.");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Determine total amount after discount if coupon is applied
    const finalAmount = couponApplied ? totalAmountAfterDiscount : totalAmount;

    // Prepare the data to be sent to the backend
    const orderData = {
      address: {
        mobileNumber,
        no,
        street,
        city,
        province,
        zipcode,
      },
      products: products.map((item) => ({
        product: item.productId._id,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
      couponCode: couponApplied ? couponCode : "",
      paymentMethod,
      finalAmount,
    };

    if (paymentMethod === "bank") {
      if (!imageBase64) {
        setShowUploadPopup(true);
        return;
      }
      orderData.receipt = imageBase64; // Add receipt to order data
    }

    if (paymentMethod === "cod") {
      const isSuccess = await createOrder(orderData);
      if (isSuccess) {
        setDeliveryDetails({});
        setCouponCode("");
        setCouponApplied(false);
        setShowModal(true); // Show the modal
      }
    } else if (paymentMethod === "bank") {
      // Submit the order with the receipt (imageBase64)
      const isSuccess = await createOrder(orderData);
      if (isSuccess) {
        setDeliveryDetails({});
        setCouponCode("");
        setCouponApplied(false);
        setShowModal(true); // Show success modal
      }
    } else {
      const randomOrderId = Math.floor(10000 + Math.random() * 90000); // Ensures a 5-digit number
      const tempOrderId = `TMP-${randomOrderId}`;
      setDeliveryDetails({});
      setCouponCode("");
      setCouponApplied(false);
      await payWithPayhere(user, tempOrderId, finalAmount, orderData, navigate);
      //  setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    navigate("/"); // Navigate to home after modal closes
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setImageBase64(base64Image);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid file.");
    }
  };

  return (
    <section className="bg-white rounded-md shadow-md lg:mt-4 lg:px-4 py-4 antialiased md:py-16">
      <form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* payment method options */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        aria-describedby="credit_card"
                        type="radio"
                        name="payment-method"
                        value="online"
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        checked={paymentMethod === "online"}
                        onChange={handlePaymentChange}
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="credit_card"
                        className="font-medium leading-none text-gray-900"
                      >
                        Pay with Card
                      </label>
                      <p
                        id="credit_card"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Pay with your credit/Debit card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="cod"
                        aria-describedby="cod"
                        type="radio"
                        name="payment-method"
                        value="cod"
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        checked={paymentMethod === "cod"}
                        onChange={handlePaymentChange}
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="cod"
                        className="font-medium leading-none text-gray-900"
                      >
                        COD
                      </label>
                      <p
                        id="cod"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Cash on delivery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="bank_deposite"
                        aria-describedby="bank_deposite"
                        type="radio"
                        name="payment-method"
                        value="bank"
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        checked={paymentMethod === "bank"}
                        onChange={handlePaymentChange}
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label
                        htmlFor="paypal-2"
                        className="font-medium leading-none text-gray-900"
                      >
                        Bank Deposite
                      </label>
                      <p
                        id="bank_deposite"
                        className="mt-1 text-xs font-normal text-gray-500"
                      >
                        Deposite the amount to our bank account
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Delivery Details Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Delivery Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="your_name"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    id="your_name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder="Bonnie Green"
                    value={user?.name}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder="example@gmail.com"
                    value={user?.email}
                    readOnly
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="mobile_number"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="number"
                    id="mobile_number"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder="07x xxx xxxx"
                    value={deliveryDetails?.mobileNumber}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        mobileNumber: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="house_number"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    House Number
                  </label>
                  <input
                    type="text"
                    id="house_number"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder=""
                    value={deliveryDetails?.no}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        no: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="street"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    id="street"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder=""
                    value={deliveryDetails?.street}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        street: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder=""
                    value={deliveryDetails?.city}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        city: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="province"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    State/Province
                  </label>
                  <select
                    id="province"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    value={deliveryDetails?.province}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        province: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="EP">Eastern</option>
                    <option value="NP">Nothern</option>
                    <option value="NW">North Western</option>
                    <option value="NC">Nothern Central</option>
                    <option value="SP">Southern</option>
                    <option value="WP">Western</option>
                    <option value="CP">Central</option>
                    <option value="SG">Sabragamuwa</option>
                    <option value="UP">UVA</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="zip_code"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Zip/Postal Code
                  </label>
                  <input
                    type="number"
                    id="zip_code"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                    placeholder="xxxxx"
                    value={deliveryDetails?.zipcode}
                    onChange={(e) =>
                      setDeliveryDetails({
                        ...deliveryDetails,
                        zipcode: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div>
              <CheckoutItems products={products} />
            </div>

            <div>
              <label
                htmlFor="voucher"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Enter a gift card, voucher or promotional code
              </label>
              <div className="flex max-w-md items-center gap-4">
                <input
                  type="text"
                  id="voucher"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  focus:border-yellow-500 focus:ring-yellow-500 focus:outline-none"
                  placeholder="COUPON CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  type="button"
                  className="flex items-center justify-center rounded-lg bg-blue-400 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 "
                >
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-500">Coupon applied successfully!</p>
              )}
            </div>

            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-500">
                {/* Repeated summary details */}

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    LKR {totalAmount.toFixed(2)}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 ">
                    Shipping
                  </dt>
                  <dd className="text-base font-medium text-gray-900">Free</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500">
                    Discount
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    {couponApplied ? `-${discountAmount.toFixed(2)}` : "0.00"}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    LKR{" "}
                    {couponApplied
                      ? totalAmountAfterDiscount.toFixed(2)
                      : totalAmount.toFixed(2)}
                  </dd>
                </dl>

                {/* Repeated summary details */}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={
                  paymentMethod === "" || loading || products.length === 0
                }
                className="flex w-full items-center justify-center rounded-lg bg-blue-400 hover:bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                {paymentMethod === "online" ? (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard /> Proceed to Pay LKR $
                    {couponApplied
                      ? totalAmountAfterDiscount.toFixed(2)
                      : totalAmount.toFixed(2)}
                  </span>
                ) : paymentMethod === "cod" ? (
                  <span className="flex items-center justify-center gap-2">
                    {" "}
                    <Truck /> Pay on Delivery
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Upload /> Upload Payment Receipt
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Upload Modal */}
      <UploadReceiptModal
        isOpen={showUploadPopup}
        onClose={() => setShowUploadPopup(false)}
        onFileChange={handleFileChange} // Bind to file input
        onUpload={handleSubmit} // Trigger on upload button
        loading={loading}
      />

      <OrderPlacedModal
        showModal={showModal}
        closeModal={closeModal}
        orderId={orderId}
      />
    </section>
  );
};

export default Checkout;
