"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/store/CartContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, cartTotal } = useCart();

  const deliveryFee = 40;
  const tax = cartTotal * 0.14;
  const finalTotal = cartTotal + (cartTotal > 0 ? deliveryFee : 0) + tax;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full max-w-md h-full bg-[#111] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-syne text-2xl font-bold flex items-center gap-2">
                <ShoppingBag /> Your Order
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg leading-tight">{item.name}</h4>
                      <div className="text-sm text-white/50 mt-1 mb-3 space-y-1">
                        <p>{item.size} • {item.crust}</p>
                        {item.addons.length > 0 && <p className="text-primary/80">+ {item.addons.join(", ")}</p>}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-black rounded-lg">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="font-bold">{Math.round(item.price * item.quantity)} EGP</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="space-y-3 mb-6 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{Math.round(cartTotal)} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (14%)</span>
                    <span>{Math.round(tax)} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee} EGP</span>
                  </div>
                  <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-white/10">
                    <span>Total</span>
                    <span>{Math.round(finalTotal)} EGP</span>
                  </div>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(225,29,72,0.3)] text-lg tracking-wider"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
