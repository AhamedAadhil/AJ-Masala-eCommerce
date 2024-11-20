import { Users, Globe, Target, Flag } from "lucide-react";

const AboutusPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-2 text-lg text-gray-600">
            Welcome to A.J Foods – Delivering quality food with passion.
          </p>
        </header>

        {/* Company Description */}
        <section className="bg-white shadow-md p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            About A.J Foods
          </h2>
          <p className="text-gray-700 leading-relaxed">
            At A.J Foods, we specialize in offering high-quality, delicious, and
            nutritious food products that meet global standards. With a mission
            to make every meal an experience, we strive to deliver excellence
            through innovation and dedication. Whether you&apos;re enjoying our
            products at home or in your business, A.J Foods ensures satisfaction
            with every bite.
          </p>
        </section>

        {/* Vision, Mission, Objectives, and Goals */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <Globe size={40} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Vision</h3>
            <p className="text-gray-600">
              To become a global leader in the food industry by inspiring
              healthier eating habits worldwide.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <Flag size={40} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mission</h3>
            <p className="text-gray-600">
              Providing premium food solutions while focusing on sustainability
              and community well-being.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <Target size={40} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Objectives</h3>
            <p className="text-gray-600">
              Deliver high-quality products, ensure customer satisfaction, and
              foster innovation in the food industry.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <Users size={40} className="text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Goals</h3>
            <p className="text-gray-600">
              Expand to new markets, build lasting customer relationships, and
              reduce environmental impact.
            </p>
          </div>
        </section>

        {/* Team Members */}
        <section className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="text-center p-4 border rounded-lg bg-gray-50"
              >
                <div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                <h3 className="text-lg font-bold text-gray-800">
                  John Doe {index + 1}
                </h3>
                <p className="text-sm text-gray-600">Team Member Role</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutusPage;
