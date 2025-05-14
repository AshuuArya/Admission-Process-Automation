import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A3C8F] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">ABES College</h2>
            <p className="mb-4">
              Providing quality education and fostering academic excellence since 1998.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FFB81C] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#FFB81C] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-[#FFB81C] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#FFB81C] transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-[#FFB81C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#FFB81C] transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-[#FFB81C] transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h2 className="text-xl font-bold mb-4">Programs</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Engineering
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Computer Applications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Pharmacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#FFB81C] transition-colors">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>19th KM Stone, NH-09, Ghaziabad, Uttar Pradesh 201009</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>admissions@abes.edu.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-700 mt-8 pt-6 text-center">
          <p>&copy; {currentYear} ABES College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;