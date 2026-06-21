import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#f5f5f5] py-16 px-8 md:px-20">
      <div className="max-w-7xl mx-auto">
     
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        
          <div className="space-y-6">
        
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-var([--color-primary]) from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                O
              </div>
              <h2 className="text-3xl font-bold text-gray-900">ORRA</h2>
            </div>

       
            <p className="text-gray-500 leading-8 text-lg max-w-sm">
              The premium peer-to-peer electronics rental marketplace. Access
              premium gadgets without buying. List your unused devices and earn.
            </p>

    
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-indigo-500" />
                <span>hello@orra.app</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-indigo-500" />
                <span>+1 (800) 123-4567</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>123 Startup Blvd, San Francisco, CA</span>
              </div>
            </div>
          </div>

        
          <div>
            <h3 className="font-semibold text-xl mb-6">Marketplace</h3>
            <ul className="space-y-4 text-gray-500">
              <li>Cameras & Lenses</li>
              <li>Laptops & PCs</li>
              <li>Drones</li>
              <li>Gaming Consoles</li>
              <li>VR & AR</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-6">Company</h3>
            <ul className="space-y-4 text-gray-500">
              <li>About Us</li>
              <li>Trust & Safety</li>
              <li>Careers</li>
              <li>Help Center</li>
              <li>Contact</li>
            </ul>
          </div>

        
          <div>
            <h3 className="font-semibold text-xl mb-6">Subscribe</h3>
            <p className="text-gray-500 mb-6">
              Get the latest news and offers from ORRA.
            </p>

            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-14 rounded-2xl bg-white border-gray-200"
              />

              <Button className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-medium">
                Subscribe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2026 ORRA Inc. All rights reserved.
          </p>

  
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="/">Terms</a>
            <a href="/">Privacy</a>
            <a href="/">Cookies</a>
          </div>

     
          <div className="flex gap-4">
            <div className="flex gap-3 mt-6 md:mt-0">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <FaXTwitter className="w-4 h-4 fill-current" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary-50 hover:text-primary-600 transition-colors"
              >
                <FaLinkedin className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
