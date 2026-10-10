"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/store/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const { itemCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const playHoverSound = () => {
    try {
      const audio = new Audio('/sounds/hover.mp3');
      audio.volume = 0.2;
      audio.play().catch(e => {}); // Ignore if audio fails due to user interaction policies
    } catch(e) {}
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Story", href: "#story" },
    { name: "Menu", href: "#menu" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-lg border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-2xl md:text-3xl font-bold font-syne tracking-tighter text-white">
          RED PIZZA<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={playHoverSound}
              className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button
            onMouseEnter={playHoverSound}
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white/80 hover:text-white transition-colors"
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in">
                {itemCount}
              </span>
            )}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-6 px-6 flex flex-col space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg uppercase tracking-wider text-white/80 hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
