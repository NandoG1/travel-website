import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Instagram, Youtube, Plane, Shield, Clock, Award } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
      
      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Plane className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TravelStay
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Discover amazing hotels worldwide with our comprehensive search platform. 
                Your perfect stay is just a click away.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
                <Youtube className="h-6 w-6 text-gray-400 hover:text-red-400 cursor-pointer transition-colors" />
              </div>
            </div>


            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">+62 123-4567-890</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">support@travelhotel.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Jakarta, Indonesian</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">www.travelhotel.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h5 className="font-semibold text-white">Secure Booking</h5>
                  <p className="text-gray-400 text-sm">SSL encrypted transactions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-blue-400" />
                <div>
                  <h5 className="font-semibold text-white">24/7 Support</h5>
                  <p className="text-gray-400 text-sm">Round-the-clock assistance</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-yellow-400" />
                <div>
                  <h5 className="font-semibold text-white">Best Price Guarantee</h5>
                  <p className="text-gray-400 text-sm">We match any lower price</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 bg-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 TravelStay. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
