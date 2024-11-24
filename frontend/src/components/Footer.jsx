import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
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
              support@ajmasala.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +1-234-567-890
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Main Office Location
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 mb-4">
            <Link to="#" className="hover:text-gray-300">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-gray-300">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-gray-300">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link to="#" className="hover:text-gray-300">
              <Youtube className="w-5 h-5" />
            </Link>
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
