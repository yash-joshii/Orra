import React from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo/orralogo.svg";
import { subscribe } from "@/api/subscribeApi";

const Footer = () => {
  const handleSubscribe = async () => {
    try {
      const response = await subscribe();
      alert(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to subscribe.");
    }
  };

  return (
    <footer className="bg-white py-16 px-6 md:px-16 border-t border-slate-100 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center p-2 shadow-md shadow-indigo-500/20 shrink-0">
                <img
                  src={logo}
                  alt="ORRA Logo"
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                ORRA
              </h2>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-normal">
              The premium peer-to-peer electronics rental marketplace. Access
              premium gadgets without buying. List your unused devices and earn.
            </p>

            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Mail className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:text-slate-900 transition-colors">
                  hello@orra.app
                </span>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <Phone className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:text-slate-900 transition-colors">
                  +1 (800) 123-4567
                </span>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer">
                <MapPin className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                <span className="group-hover:text-slate-900 transition-colors">
                  123 Startup Blvd, San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-4">
              Marketplace
            </h3>
            <ul className="space-y-3 text-sm text-slate-500 font-normal">
              {["Cameras & Lenses", "Laptops & PCs", "Drones", "Gaming Consoles", "VR & AR"].map((item) => (
                <li
                  key={item}
                  className="hover:text-slate-900 hover:translate-x-1 cursor-pointer transition-all duration-200 w-fit"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-500 font-normal">
              {["About Us", "Trust & Safety", "Careers", "Help Center", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-slate-900 hover:translate-x-1 cursor-pointer transition-all duration-200 w-fit"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription Section */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-4">Subscribe</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Get the latest news and offers from ORRA.
            </p>

            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11 rounded-xl bg-slate-100/70 border-0 placeholder:text-slate-400 text-sm px-4 focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all shadow-inner"
              />

              <Button
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
                onClick={handleSubscribe}
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© 2026 ORRA Inc. All rights reserved.</p>

          <div className="flex gap-6 font-normal">
            <a href="/" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="/" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="/" className="hover:text-slate-900 transition-colors">Cookies</a>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: FaXTwitter, key: "x" },
              { icon: FaInstagram, key: "insta" },
              { icon: FaLinkedin, key: "linkedin" },
            ].map(({ icon: Icon, key }) => (
              <a
                key={key}
                href="#"
                className="w-9 h-9 rounded-full bg-slate-100/80 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5 fill-current" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;