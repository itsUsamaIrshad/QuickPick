import React from 'react'
import { assets } from '../assests/assets/frontend_assets/assets'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src={assets.logo} 
                alt="Company Logo" 
                className="h-28 w-auto"
              />
           
            </div>
            <p className="text-gray-400">
              Premium quality products for your everyday life. We deliver excellence since {date - 5}.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">COMPANY</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Products', 'Delivery', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-pink-500 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">GET IN TOUCH</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 hover:text-pink-500 transition-colors">+92-301-66-599</p>
                  <p className="text-gray-500 text-xs">Mon-Fri, 9am-5pm</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 hover:text-blue-400 transition-colors">usamairshad9192@gmail.com</p>
                  <p className="text-gray-500 text-xs">24/7 Support</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">NEWSLETTER</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-500 flex-1"
              />
              <button className="bg-gradient-to-r from-pink-500 to-blue-600 text-white px-4 py-2 rounded-r-md hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            Copyright © {date} FOREVER. All Rights Reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500 transition-colors text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer