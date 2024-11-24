import { RefreshCcw, PackageCheck, Info, Mail } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-black mb-6">Refund Policy</h1>
        <p className="text-gray-700 mb-4">
          Thank you for shopping at{" "}
          <span className="font-semibold">AJ Masala</span>. We value your
          satisfaction and are committed to providing you with the best online
          shopping experience. If you're not completely satisfied with your
          purchase, we're here to help.
        </p>

        {/* Returns */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <RefreshCcw className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Returns</h2>
          </div>
          <p className="text-gray-700">
            We accept returns within{" "}
            <span className="font-semibold">5 days</span> from the date of
            purchase. To be eligible, items must be unused, in the same
            condition as received, and in the original packaging.
          </p>
        </section>

        {/* Refunds */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <PackageCheck className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Refunds</h2>
          </div>
          <p className="text-gray-700">
            Once we receive and inspect the returned item, we'll notify you
            about the refund status. If approved, a refund will be processed to
            your original payment method. Shipping charges are non-refundable.
          </p>
        </section>

        {/* Exchanges */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <RefreshCcw className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Exchanges</h2>
          </div>
          <p className="text-gray-700">
            Exchanges are accepted within{" "}
            <span className="font-semibold">5 days</span> for different sizes,
            colors, or styles. Contact our support team for instructions.
          </p>
        </section>

        {/* Non-Returnable Items */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Non-Returnable Items
            </h2>
          </div>
          <p className="text-gray-700">
            The following items cannot be returned or refunded:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Personalized or custom-made items</li>
            <li>Perishable goods</li>
          </ul>
        </section>

        {/* Damaged or Defective Items */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Damaged or Defective Items
            </h2>
          </div>
          <p className="text-gray-700">
            If your item arrives damaged or defective, contact us immediately
            for a replacement or refund.
          </p>
        </section>

        {/* Return Shipping */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <RefreshCcw className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Return Shipping
            </h2>
          </div>
          <p className="text-gray-700">
            Customers are responsible for return shipping costs unless the
            return is due to our error. In such cases, a prepaid shipping label
            will be provided.
          </p>
        </section>

        {/* Processing Time */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Processing Time
            </h2>
          </div>
          <p className="text-gray-700">
            Refunds and exchanges will be processed within{" "}
            <span className="font-semibold">5-7 business days</span> of
            receiving the returned item. Additional time may be required for the
            refund to reflect in your account.
          </p>
        </section>

        {/* Contact */}
        <section className="mt-6">
          <div className="flex items-center mb-2">
            <Mail className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Contact Us</h2>
          </div>
          <p className="text-gray-700">
            If you have questions about our refund policy, please reach out to
            our customer support team. We are here to assist you.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
