"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 240;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const loadImages = () => {
      // 1. Load the FIRST image immediately
      const firstImg = new Image();
      firstImg.src = `/images/frames/frame-001.webp`;
      
      firstImg.onload = () => {
        images[0] = firstImg;
        imagesRef.current = images;
        renderFrame(0); // Show it instantly

        // 2. Load the remaining images in the background
        for (let i = 2; i <= TOTAL_FRAMES; i++) {
          const img = new Image();
          const paddedIndex = i.toString().padStart(3, "0");
          img.src = `/images/frames/frame-${paddedIndex}.webp`;
          
          img.onload = () => {
            images[i - 1] = img;
          };
          img.onerror = () => {
            images[i - 1] = images[i - 2] || new Image();
          };
        }
      };
    };

    loadImages();

    const renderFrame = (index: number) => {
      if (!imagesRef.current[index]) return;
      const img = imagesRef.current[index];
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    const handleResize = () => {
      renderFrame(Math.round(currentFrameRef.current.frame));
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const initScrollTrigger = () => {
      // Animate frames across the ENTIRE page scroll, looping 2 times for smoother motion
      gsap.to(currentFrameRef.current, {
        frame: (TOTAL_FRAMES * 2) - 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // High scrub value acts as momentum/smoothing on jumpy mobile scrolls
          onUpdate: () => {
            const actualFrame = Math.floor(currentFrameRef.current.frame) % TOTAL_FRAMES;
            renderFrame(actualFrame);
          },
        },
      });

      // Typography Animations within the Hero section container (400vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // Intro Text (Starts visible, leaves immediately on scroll)
      tl.to(".text-intro", { opacity: 0, y: -50, duration: 0.05 }, 0);

      // Text 1: Station 1
      tl.to(".text-1", { opacity: 1, x: 0, duration: 0.05 }, 0.05)   // Enter
        .to(".text-1", { opacity: 1, x: 0, duration: 0.15 })         // Hold (images keep moving)
        .to(".text-1", { opacity: 0, x: -100, duration: 0.05 }, 0.25); // Exit
        
      // Text 2: Station 2
      tl.to(".text-2", { opacity: 1, x: 0, duration: 0.05 }, 0.35)   // Enter
        .to(".text-2", { opacity: 1, x: 0, duration: 0.15 })         // Hold
        .to(".text-2", { opacity: 0, x: 100, duration: 0.05 }, 0.55);  // Exit

      // Text 3: Station 3
      tl.to(".text-3", { opacity: 1, x: 0, duration: 0.05 }, 0.65)   // Enter
        .to(".text-3", { opacity: 1, x: 0, duration: 0.15 })         // Hold
        .to(".text-3", { opacity: 0, x: -100, duration: 0.05 }, 0.85); // Exit

      // CTA: Final Station
      tl.to(".text-cta", { opacity: 1, x: 0, duration: 0.05 }, 0.95);
    };

    initScrollTrigger();

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Fixed Canvas Background for the whole site */}
      <div className="fixed inset-0 z-[-1] bg-black pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-dark/20 via-black to-black opacity-80" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content Container (gives scroll space for the intro texts) */}
      <div id="home" ref={containerRef} className="relative h-[400vh] w-full">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none flex items-center justify-center">
          
          {/* Intro Text: Starts fully visible, disappears on scroll */}
          <div className="text-intro absolute text-center px-4 w-full flex flex-col items-center justify-center pointer-events-auto">
            <h1 className="font-syne text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl uppercase">
              <span className="text-accent">Red</span> Pizza
            </h1>
            <div className="mt-8 flex flex-col items-center opacity-70 animate-bounce">
              <span className="text-sm tracking-[0.3em] uppercase mb-2 font-syne">Swipe Down</span>
              <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>

          <div className="text-1 opacity-0 -translate-x-32 absolute text-center px-4 w-full max-w-4xl">
            <h2 className="font-syne text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Crafted with <span className="text-accent italic">Obsession.</span>
            </h2>
            <p className="mt-6 text-lg md:text-2xl text-white/90 font-light tracking-wide drop-shadow-lg">
              Fire-baked Pepperoni & Smoked Sausage.
            </p>
          </div>

          <div className="text-2 opacity-0 translate-x-32 absolute text-center px-4 w-full max-w-4xl">
            <h2 className="font-syne text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              Slow-fermented <br />
              <span className="text-primary italic">72-hour Dough</span>
            </h2>
            <p className="mt-6 text-lg md:text-2xl text-white/90 font-light tracking-wide drop-shadow-lg">
              & Melting Artisan Mozzarella.
            </p>
          </div>

          <div className="text-3 opacity-0 -translate-x-32 absolute text-center px-4 w-full max-w-4xl">
            <h2 className="font-syne text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
              The Perfect <span className="text-accent italic">Bite.</span>
            </h2>
            <p className="mt-6 text-lg md:text-2xl text-white/90 font-light tracking-wide drop-shadow-lg">
              Fresh Out of the Brick Oven.
            </p>
          </div>

          <div className="text-cta opacity-0 translate-x-32 absolute text-center pointer-events-auto">
            <a 
              href="#menu" 
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-bold tracking-widest uppercase rounded-full hover:bg-accent-dark hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.4)]"
            >
              Explore The Menu
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
