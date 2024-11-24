import { FileText, ShieldAlert, ShoppingCart, Package } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-black mb-4">
          Welcome to <span className="font-semibold">AJ Masala</span>. These
          Terms and Conditions govern your use of our website and the purchase
          of our products. By using our website, you agree to these terms.
          Please read them carefully.
        </p>

        {/* Use of the Website */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Use of the Website
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              You must be at least <strong>18 years old</strong> to use our
              website or make purchases.
            </li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>
              Provide accurate and current information during registration and
              checkout.
            </li>
            <li>
              Do not use our website for unlawful or unauthorized purposes.
            </li>
          </ul>
        </section>

        {/* Product Information and Pricing */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <ShoppingCart className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Product Information and Pricing
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              We strive to provide accurate product details but cannot guarantee
              completeness.
            </li>
            <li>
              Prices are subject to change without notice; promotions may have
              additional terms.
            </li>
          </ul>
        </section>

        {/* Orders and Payments */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Orders and Payments
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            <li>Placing an order constitutes an offer to purchase products.</li>
            <li>
              We reserve the right to cancel orders for various reasons,
              including errors or fraud.
            </li>
            <li>
              Provide valid payment details; we securely process payments via
              third-party providers.
            </li>
          </ul>
        </section>

        {/* Shipping and Delivery */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Package className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Shipping and Delivery
            </h2>
          </div>
          <p className="text-gray-700">
            We make every effort to ensure timely shipping and delivery.
            Shipping times are estimates and may vary based on location and
            circumstances.
          </p>
        </section>

        {/* Returns and Refunds */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <ShieldAlert className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Returns and Refunds
            </h2>
          </div>
          <p className="text-gray-700">
            Refer to our{" "}
            <span className="font-semibold text-yellow-500">
              Returns and Refund Policy
            </span>{" "}
            for details on returning products and seeking refunds.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Intellectual Property
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              All website content, including text, images, and graphics, is
              protected by intellectual property rights.
            </li>
            <li>
              You may not reproduce, distribute, or modify content without prior
              consent.
            </li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <ShieldAlert className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Limitation of Liability
            </h2>
          </div>
          <p className="text-gray-700">
            We are not liable for any indirect, incidental, or consequential
            damages arising from your use of our website or products.
          </p>
        </section>

        {/* Amendments and Termination */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <FileText className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Amendments and Termination
            </h2>
          </div>
          <p className="text-gray-700">
            We reserve the right to modify or terminate these terms at any time
            without notice. It is your responsibility to review the terms
            periodically.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <div className="flex items-center mb-2">
            <ShieldAlert className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Contact Us</h2>
          </div>
          <p className="text-gray-700">
            If you have any questions about these terms, please contact us using
            the information provided on our website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
