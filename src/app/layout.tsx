"use client";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import { CartProvider } from "@/store/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Sound preloading for hover effects
    const audio = new Audio('/sounds/hover.mp3');
    audio.load();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Inferno | Award-Winning Artisan Pizza</title>
        <meta name="description" content="Modern, high-end pizza brand." />
      </head>
      <body className={`${inter.variable} ${syne.variable} font-sans`}>
        <ReactLenis root options={{ syncTouch: true, touchMultiplier: 2, lerp: 0.1 }}>
          <CartProvider>
            <Header />
            {children}
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
