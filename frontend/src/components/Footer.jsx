import { Mail, Phone, MapPin, CreditCard, Landmark, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white mt-5 p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About AJ Masala</h3>
          <p className="text-sm">
            AJ Masala specializes in premium spices and masalas, offering
            authentic flavors for every meal.
          </p>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Policies</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/refund-policy" className="hover:underline">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-conditions" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@ajfoodz.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +94-777-325-533
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Bandaranayakepure,Rajagiriya,Colombo
            </li>
          </ul>
        </div>

        {/* We Accept Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">We Accept</h3>
          <div>
            <p className="text-sm mb-2">Card Payments or Online Payments</p>
            <a href="https://www.payhere.lk" target="_blank">
              <img
                src="https://www.payhere.lk/downloads/images/payhere_long_banner.png"
                alt="PayHere"
                width="400"
              />
            </a>
            <div className="mt-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Credit/Debit Card via PayHere
                </li>
                <li className="flex items-center gap-2">
                  <Landmark className="w-4 h-4" />
                  Bank Transfer
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Cash on Delivery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} AJ Masala. All rights reserved. Designed
          and developed by{" "}
          <Link to="#" className="font-semibold hover:underline">
            A2Labz
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
