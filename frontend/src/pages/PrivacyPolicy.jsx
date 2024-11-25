import { ShieldCheck, Info, Cookie } from "lucide-react";
import { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-black mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At <span className="font-semibold">AJ Masala</span>, we are committed
          to protecting your privacy and ensuring the security of your personal
          information. This policy explains how we collect, use, and safeguard
          your data. By using our website, you agree to the practices outlined
          here.
        </p>

        {/* Information We Collect */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Information We Collect
            </h2>
          </div>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <span className="font-semibold">Personal information</span>: Name,
              email, phone number provided during registration or checkout.
            </li>
            <li>
              <span className="font-semibold">Payment details</span>: Securely
              processed via trusted third-party payment processors.
            </li>
            <li>
              <span className="font-semibold">Browsing data</span>: IP address,
              browser type, and device information collected via cookies.
            </li>
          </ul>
        </section>

        {/* Use of Information */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Use of Information
            </h2>
          </div>
          <p className="text-gray-700">We use your information for:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              Processing and fulfilling orders, including shipping and delivery.
            </li>
            <li>
              Communicating with you about purchases, inquiries, or customer
              support.
            </li>
            <li>
              Personalizing your shopping experience with tailored product
              recommendations.
            </li>
            <li>Improving our website, products, and services.</li>
            <li>Detecting and preventing fraud or unauthorized activities.</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Information Sharing
            </h2>
          </div>
          <p className="text-gray-700">
            We respect your privacy and will not sell or trade your data.
            However, we may share information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              <span className="font-semibold">Trusted service providers</span>:
              For website operation, payment processing, and product delivery.
            </li>
            <li>
              <span className="font-semibold">Legal requirements</span>: When
              required by law or legal orders.
            </li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Data Security</h2>
          </div>
          <p className="text-gray-700">
            We implement industry-standard measures to protect your personal
            information. However, no method of transmission or storage is
            completely secure.
          </p>
        </section>

        {/* Cookies and Tracking */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Cookie className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Cookies and Tracking
            </h2>
          </div>
          <p className="text-gray-700">
            We use cookies to enhance your browsing experience and analyze
            website traffic. You can disable cookies via browser settings, but
            this may limit website functionality.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="mb-6">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">
              Changes to the Privacy Policy
            </h2>
          </div>
          <p className="text-gray-700">
            We may update this policy periodically. Changes will be posted here
            with a revised &quot;last updated&quot; date.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <div className="flex items-center mb-2">
            <ShieldCheck className="w-5 h-5 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold text-black">Contact Us</h2>
          </div>
          <p className="text-gray-700">
            If you have any questions or concerns, feel free to contact our
            support team. We are here to help.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
