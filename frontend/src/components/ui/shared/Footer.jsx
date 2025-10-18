import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-6 mt-40 mb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-800 to-pink-600 bg-clip-text text-transparent">
              Hire<span className="text-[#f83002]">Flow</span>
            </h2>
            <p className="text-gray-600 text-sm mt-3 leading-relaxed">
              Empowering recruiters and candidates with a seamless, modern hiring
              experience. Streamline your job search and hiring process effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-600 text-md">
              <li>
                <a href="#" className="hover:text-purple-900  transition">
                  About Us
                </a>
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                <a href="#" className="hover:text-purple-900 transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mt-2 mx-25">
              {[
                
                {
                  href: "https://twitter.com",
                  label: "Twitter",
                  icon: (
                    <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/devansri",
                 
                  label: "LinkedIn",
                  icon: (
                    <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                  ),
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-700 hover:text-purple-700  transition-transform transform hover:scale-110"
                  aria-label={social.label}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className=" mt-5 border-t border-gray-300 pt-4 text-center text-md text-gray-500">
          © {new Date().getFullYear()} HireFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
