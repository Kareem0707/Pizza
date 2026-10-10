"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <section id="story" className="relative bg-background/80 backdrop-blur-sm py-32 px-6 lg:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="flex-1 lg:pr-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="text-primary font-semibold tracking-[0.3em] uppercase text-sm mb-4">Our Heritage</h4>
              <h2 className="font-syne text-5xl md:text-6xl font-bold leading-tight mb-8">
                Born from <span className="italic text-white/50">Fire</span><br />
                Crafted by <span className="text-accent italic">Hand.</span>
              </h2>
              <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
                <p>
                  Our journey began in a small brick oven, fueled by a passion for authentic Italian traditions and the finest local ingredients. 
                </p>
                <p>
                  Every pie is a testament to our obsession. We use premium Italian 00 flour, slow-fermenting our dough for a full 72 hours to achieve that impossibly light, airy, and crisp crust. 
                </p>
                <p>
                  Paired with locally smoked sausages, hand-crushed San Marzano tomatoes, and artisan mozzarella, we don't just bake pizza—we craft an experience.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Image Composition */}
          <div className="flex-1 w-full relative h-[600px] flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
            
            {/* Image Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              whileInView={{ opacity: 1, x: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute w-64 h-80 md:w-80 md:h-96 -translate-x-10 -translate-y-10 z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop" 
                alt="Wood fire oven" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute w-64 h-80 md:w-80 md:h-96 translate-x-12 translate-y-16 z-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img 
                src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop" 
                alt="Artisan pizza making" 
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
