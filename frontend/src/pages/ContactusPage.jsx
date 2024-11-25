import { Mail, Phone, MapPin, MessageCircle, Loader } from "lucide-react";
import { useState } from "react";

import { useUserStore } from "../stores/useUserStore";

const ContactusPage = () => {
  const { sendMailToAdmin, loading } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMailToAdmin(formData);
  };

  const handleChange = (e) => {
    setFormData((formData) => ({ ...formData, [e.target.id]: e.target.value }));
  };
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            We’re here to help! Reach out to us through the form below or any of
            our contact channels.
          </p>
        </header>

        {/* Contact Details Section */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin size={24} className="text-blue-500 mr-3" />
                <span>Main Office: Bandaranayakepure,Rajagiriya,Colombo</span>
              </li>
              <li className="flex items-center">
                <MapPin size={24} className="text-green-500 mr-3" />
                <span>Sub Office: Paddiyadipitty, Ampara Rd, Akkaraipattu</span>
              </li>
              <li className="flex items-center">
                <Mail size={24} className="text-red-500 mr-3" />
                <span>Email: support@ajfoodz.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={24} className="text-purple-500 mr-3" />
                <span>Hotline: +94 113 401 401</span>
              </li>
              <li className="flex items-center">
                <MessageCircle size={24} className="text-green-500 mr-3" />
                <span>WhatsApp: +94 777 325 533</span>
              </li>
            </ul>
          </div>

          {/* Google Maps */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Find Us Here
            </h2>
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1283.271848843474!2d81.83136928540428!3d7.22355759391251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae513492a538f81%3A0xcc6eba1537d90652!2sA.J%20Foods%20(PVT)%20ltd!5e0!3m2!1sen!2slk!4v1732104920305!5m2!1sen!2slk"
              width="100%"
              height="300"
              className="border rounded-lg"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mt-1 block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Email"
                required
                className="mt-1 block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 block w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  {" "}
                  <Loader className="animate-spin" /> Sending mail please wait
                </span>
              ) : (
                " Submit"
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactusPage;
