import { Link } from 'react-router-dom';
import { ChevronRight, GraduationCap, FileText, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0A3C8F] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to ABES College Admissions
              </h1>
              <p className="text-lg mb-8">
                Start your journey towards a successful career with our comprehensive
                programs and world-class facilities.
              </p>
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-[#FFB81C] text-[#0A3C8F] px-6 py-3 rounded-md font-bold hover:bg-yellow-500 transition-colors inline-flex items-center"
                >
                  Go to Dashboard
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-[#FFB81C] text-[#0A3C8F] px-6 py-3 rounded-md font-bold hover:bg-yellow-500 transition-colors inline-flex items-center"
                >
                  Apply Now
                  <ChevronRight size={20} className="ml-2" />
                </Link>
              )}
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="ABES College Campus"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Academic Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a variety of undergraduate and postgraduate programs designed to
              prepare you for the challenges of tomorrow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src="https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Engineering Program"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  B.Tech Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  Offering specializations in Computer Science, Electronics, Mechanical,
                  and Civil Engineering.
                </p>
                <Link
                  to="/register"
                  className="text-[#0A3C8F] font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Program Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Management Program"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Management Programs
                </h3>
                <p className="text-gray-600 mb-4">
                  BBA and MBA programs with various specializations including Finance,
                  Marketing, and HR.
                </p>
                <Link
                  to="/register"
                  className="text-[#0A3C8F] font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Program Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <img
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Computer Applications Program"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Computer Applications
                </h3>
                <p className="text-gray-600 mb-4">
                  BCA and MCA programs designed to build strong programming and application
                  development skills.
                </p>
                <Link
                  to="/register"
                  className="text-[#0A3C8F] font-semibold hover:text-blue-700 inline-flex items-center"
                >
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Admission Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple step-by-step process to help you start your journey with ABES College.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#0A3C8F] text-white rounded-full flex items-center justify-center">
                  <GraduationCap size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Register</h3>
              <p className="text-gray-600">
                Create an account on our admission portal to begin your application process.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#0A3C8F] text-white rounded-full flex items-center justify-center">
                  <FileText size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Fill Application
              </h3>
              <p className="text-gray-600">
                Complete the application form with your personal and academic details.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#0A3C8F] text-white rounded-full flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Document Upload
              </h3>
              <p className="text-gray-600">
                Upload required documents including mark sheets, ID proof, and photographs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[#0A3C8F] text-white rounded-full flex items-center justify-center">
                  <Clock size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Track Status
              </h3>
              <p className="text-gray-600">
                Monitor your application status and receive updates on admission decisions.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/register"
              className="bg-[#0A3C8F] text-white px-6 py-3 rounded-md font-bold hover:bg-blue-800 transition-colors"
            >
              Start Your Application
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose ABES College?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide a conducive environment for learning, innovation, and overall
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="ABES College Campus"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-[#FFB81C] p-1 rounded-full mr-3 mt-1">
                    <CheckCircle size={16} className="text-[#0A3C8F]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      State-of-the-art Infrastructure
                    </h3>
                    <p className="text-gray-600">
                      Modern classrooms, well-equipped laboratories, and extensive library
                      resources.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#FFB81C] p-1 rounded-full mr-3 mt-1">
                    <CheckCircle size={16} className="text-[#0A3C8F]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Experienced Faculty
                    </h3>
                    <p className="text-gray-600">
                      Learn from industry experts and academicians with years of experience in
                      their respective fields.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#FFB81C] p-1 rounded-full mr-3 mt-1">
                    <CheckCircle size={16} className="text-[#0A3C8F]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Industry Connections
                    </h3>
                    <p className="text-gray-600">
                      Strong ties with leading companies for internships, projects, and
                      placement opportunities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#FFB81C] p-1 rounded-full mr-3 mt-1">
                    <CheckCircle size={16} className="text-[#0A3C8F]" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Comprehensive Development
                    </h3>
                    <p className="text-gray-600">
                      Focus on academic excellence, skill development, and personality growth
                      through various activities.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0A3C8F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join ABES College?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards a bright future. Apply for admission today and
            become a part of our esteemed institution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-[#FFB81C] text-[#0A3C8F] px-6 py-3 rounded-md font-bold hover:bg-yellow-500 transition-colors"
            >
              Apply Now
            </Link>
            <a
              href="#"
              className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-bold hover:bg-white hover:text-[#0A3C8F] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;