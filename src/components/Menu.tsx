"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, CartItem } from "@/store/CartContext";
import { X, Plus, Minus } from "lucide-react";

type Pizza = {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  image: string;
};

const menuItems: Pizza[] = [
  { id: "p1", name: "Smoked Sausage Inferno", category: "Signature", description: "Signature hot honey, fresh basil, double mozzarella, smoked sausage.", basePrice: 280, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop" },
  { id: "p2", name: "Truffle Wild Mushroom", category: "Signature", description: "White garlic base, fontina, crimini mushrooms, truffle oil.", basePrice: 320, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
  { id: "p3", name: "Classic Margherita", category: "Classic", description: "San Marzano tomatoes, buffalo mozzarella, olive oil.", basePrice: 190, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop" },
  { id: "p4", name: "Four Cheese Rustica", category: "Classic", description: "Gorgonzola, parmigiano reggiano, mozzarella, ricotta.", basePrice: 250, image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=800&auto=format&fit=crop" },
  { id: "p5", name: "BBQ Chicken", category: "Signature", description: "Grilled chicken, red onions, cilantro, BBQ sauce base.", basePrice: 260, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop" },
  { id: "p6", name: "Spicy Ranch", category: "Signature", description: "Chicken, jalapenos, mozzarella, creamy ranch drizzle.", basePrice: 270, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
  { id: "p7", name: "Seafood Supreme", category: "Signature", description: "Shrimp, calamari, garlic butter, fresh parsley.", basePrice: 350, image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop" },
  { id: "p8", name: "Super Supreme", category: "Classic", description: "Pepperoni, sausage, bell peppers, onions, olives.", basePrice: 290, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop" },
  { id: "p9", name: "Vegetarian Fresh", category: "Classic", description: "Mushrooms, green peppers, tomatoes, black olives.", basePrice: 210, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop" },
  { id: "p10", name: "Hawaiian Tropical", category: "Classic", description: "Smoked turkey, fresh pineapple, mozzarella.", basePrice: 240, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop" },
  { id: "p11", name: "Meat Lovers", category: "Signature", description: "Beef, pepperoni, sausage, smoked turkey, extra cheese.", basePrice: 330, image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?q=80&w=800&auto=format&fit=crop" },
  { id: "p12", name: "Chicken Alfredo", category: "Signature", description: "Creamy alfredo sauce, grilled chicken, spinach.", basePrice: 280, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop" },
  { id: "p13", name: "Buffalo Chicken", category: "Signature", description: "Spicy buffalo sauce, crispy chicken, blue cheese.", basePrice: 270, image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop" },
  { id: "p14", name: "Spinach & Feta", category: "Classic", description: "Fresh spinach, feta cheese, garlic, olive oil.", basePrice: 220, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop" },
  { id: "p15", name: "Classic Pepperoni", category: "Classic", description: "Double pepperoni, tomato sauce, mozzarella.", basePrice: 240, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["All", "Signature", "Classic"];

const sizeOptions = [
  { name: "Small", diff: -50 },
  { name: "Medium", diff: 0 },
  { name: "Large", diff: 80 },
];

const crustOptions = [
  { name: "Traditional Neapolitan", price: 0 },
  { name: "Stuffed Cheese Crust", price: 40 },
  { name: "Crispy Thin", price: 0 },
];

const addonOptions = [
  { name: "Extra Cheese", price: 30 },
  { name: "Hot Honey", price: 20 },
  { name: "Mushrooms", price: 25 },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const filteredItems = menuItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="menu" className="py-32 px-6 lg:px-12 bg-black/80 backdrop-blur-sm relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-syne text-4xl md:text-5xl font-bold mb-6">The Menu</h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                onClick={() => setSelectedPizza(item)}
                className="group cursor-pointer bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full font-bold text-white border border-white/10">
                    From {(item.basePrice || 240) - 50} EGP
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-syne text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selectedPizza && (
          <PizzaModal 
            pizza={selectedPizza} 
            onClose={() => setSelectedPizza(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function PizzaModal({ pizza, onClose }: { pizza: Pizza; onClose: () => void }) {
  const { addToCart } = useCart();
  const [size, setSize] = useState(sizeOptions[1]);
  const [crust, setCrust] = useState(crustOptions[0]);
  const [addons, setAddons] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const toggleAddon = (addonName: string) => {
    setAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  const calculateTotal = () => {
    let total = (pizza.basePrice || 240) + size.diff + crust.price;
    addons.forEach((aName) => {
      const addon = addonOptions.find((a) => a.name === aName);
      if (addon) total += addon.price;
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${pizza.id}-${size.name}-${crust.name}-${addons.join("-")}`,
      name: pizza.name,
      price: calculateTotal() / quantity,
      quantity,
      size: size.name,
      crust: crust.name,
      addons,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-background border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl flex flex-col md:flex-row"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-accent rounded-full text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="md:w-2/5 h-64 md:h-auto relative">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent md:bg-gradient-to-r" />
        </div>

        <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
          <h3 className="font-syne text-2xl md:text-3xl font-bold mb-2">{pizza.name}</h3>
          <p className="text-white/60 text-sm mb-6">{pizza.description}</p>

          <div className="space-y-6 flex-1">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                      size.name === s.name
                        ? "border-primary bg-primary/20 text-white"
                        : "border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Crust</h4>
              <div className="flex flex-col gap-2">
                {crustOptions.map((c) => (
                  <label key={c.name} className="flex items-center justify-between p-3 rounded-lg border border-white/10 cursor-pointer hover:border-white/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${crust.name === c.name ? "border-primary" : "border-white/30"}`}>
                        {crust.name === c.name && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <span className="text-sm">{c.name}</span>
                    </div>
                    {c.price > 0 && <span className="text-accent text-sm">+{c.price} EGP</span>}
                    <input type="radio" className="hidden" checked={crust.name === c.name} onChange={() => setCrust(c)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Add-ons</h4>
              <div className="flex flex-col gap-2">
                {addonOptions.map((a) => (
                  <label key={a.name} className="flex items-center justify-between p-3 rounded-lg border border-white/10 cursor-pointer hover:border-white/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${addons.includes(a.name) ? "border-primary bg-primary" : "border-white/30"}`}>
                        {addons.includes(a.name) && <X size={12} className="text-white" />}
                      </div>
                      <span className="text-sm">{a.name}</span>
                    </div>
                    <span className="text-accent text-sm">+{a.price} EGP</span>
                    <input type="checkbox" className="hidden" checked={addons.includes(a.name)} onChange={() => toggleAddon(a.name)} />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center border border-white/20 rounded-full bg-white/5">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-semibold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <Plus size={16} />
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full flex items-center justify-between transition-colors shadow-[0_0_20px_rgba(22,163,74,0.3)]"
            >
              <span>Add to Cart</span>
              <span>{calculateTotal()} EGP</span>
            </motion.button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
