"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black/90 backdrop-blur-md pt-20 pb-10 px-6 lg:px-12 border-t border-white/5 relative z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold font-syne tracking-tighter text-white mb-6">
              RED PIZZA<span className="text-accent">.</span>
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Crafting authentic fire-baked artisan pizzas since 1998. Obsession in every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide">Location</h4>
            <address className="text-white/60 text-sm not-italic space-y-4">
              <p>Sheikh Zayed City<br />Giza, Egypt</p>
              <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110532.8856698661!2d29.914210620863032!3d30.032612735706437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840ca845a7d79%3A0xcb1e2a045952cba1!2sSheikh%20Zayed%20City%2C%20Giza%20Governorate%2C%20Egypt!5e0!3m2!1sen!2sus!4v1713300000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </address>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide">Hours</h4>
            <ul className="text-white/60 text-sm space-y-2">
              <li className="flex justify-between"><span>Mon - Thu</span> <span>11:00 AM - 10:00 PM</span></li>
              <li className="flex justify-between"><span>Fri - Sat</span> <span>11:00 AM - 12:00 AM</span></li>
              <li className="flex justify-between"><span>Sunday</span> <span>12:00 PM - 9:00 PM</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wide">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4">Join our list for exclusive offers and secret menu drops.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <button 
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-white text-black font-bold text-xs uppercase tracking-wider px-4 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Credit Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-white/40 text-xs">
            © 2026 Red Pizza. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Designed By <a href="https://karimodesign.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:text-accent transition-colors duration-300">KarimoDesign</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
