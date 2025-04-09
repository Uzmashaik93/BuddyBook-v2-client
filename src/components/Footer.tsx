import { Github } from "lucide-react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 text-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mb-2">
          <div>
            <h3 className="text-lg font-bold mb-4 flex gap-2 justify-center">
              Buddy Book
              <a
                href="https://github.com/Uzmashaik93/BuddyBook-v2-client"
                target="_blank"
              >
                <Github className="hover:text-pink-400" />
              </a>
            </h3>
            <p className="text-gray-700">
              Your digital slambook to create and share memories with friends.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-pink-500 transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 hover:text-pink-500 transition"
                >
                  Features
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className=" border-gray-700 pt-2 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Buddy Book. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
