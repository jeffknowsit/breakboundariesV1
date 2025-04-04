import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCart, Truck, Star, Filter, SlidersHorizontal, Accessibility, Ear } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ultra-Lightweight Foldable Wheelchair",
    category: "Mobility",
    price: 499.99,
    rating: 4.8,
    reviewCount: 243,
    image: "https://images.unsplash.com/photo-1512923927402-006d0b366313?q=80&w=600&auto=format&fit=crop",
    description: "Ergonomic wheelchair design with premium aluminum frame, weighing only 19 lbs with easy folding mechanism for transport and storage.",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Digital Hearing Aid with Noise Cancellation",
    category: "Hearing",
    price: 329.99,
    rating: 4.7,
    reviewCount: 187,
    image: "https://images.unsplash.com/photo-1589649762763-f95e06de1a27?q=80&w=600&auto=format&fit=crop",
    description: "Advanced digital hearing aid with multi-channel noise cancellation and adaptive directional microphones for clearer conversations.",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Adjustable Walking Cane with LED Light",
    category: "Mobility",
    price: 79.99,
    rating: 4.5,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1599056407101-7c557a4a0144?q=80&w=600&auto=format&fit=crop",
    description: "Height-adjustable walking cane with built-in LED light, anti-slip base, and ergonomic handle for comfortable grip.",
    inStock: true
  },
  {
    id: 4,
    name: "Rechargeable Bluetooth-enabled Hearing Amplifier",
    category: "Hearing",
    price: 199.99,
    rating: 4.6,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1613307446588-bd27bacd3dac?q=80&w=600&auto=format&fit=crop",
    description: "Discreet hearing amplifier with Bluetooth connectivity for phone calls and audio streaming, featuring 20-hour battery life.",
    inStock: true
  },
  {
    id: 5,
    name: "Electric Power Wheelchair with Reclining Feature",
    category: "Mobility",
    price: 1299.99,
    rating: 4.9,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=600&auto=format&fit=crop",
    description: "Feature-rich electric wheelchair with reclining backrest, adjustable footrests, and long-lasting battery for extended use.",
    inStock: true
  },
  {
    id: 6,
    name: "Adaptive Keyboard with Large Keys",
    category: "Computer Access",
    price: 59.99,
    rating: 4.4,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
    description: "Large-key keyboard with high contrast colors and adjustable typing sensitivity for users with motor skill challenges.",
    inStock: true
  },
  {
    id: 7,
    name: "Assistive Touch Screen Stylus Set",
    category: "Computer Access",
    price: 29.99,
    rating: 4.3,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1584739140170-71f13c1d4f91?q=80&w=600&auto=format&fit=crop",
    description: "Set of 3 ergonomic styluses designed for users with limited hand dexterity, compatible with all touch screen devices.",
    inStock: false
  },
  {
    id: 8,
    name: "Smart Home Control Hub for Voice Commands",
    category: "Home Assistance",
    price: 149.99,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=600&auto=format&fit=crop",
    description: "Central hub for controlling home devices through simple voice commands, designed specifically for accessibility needs.",
    inStock: true
  }
];

const categories = [
  { name: "Mobility", icon: <Accessibility size={20} /> },
  { name: "Hearing", icon: <Ear size={20} /> },
  { name: "Computer Access", icon: <SlidersHorizontal size={20} /> },
  { name: "Home Assistance", icon: <SlidersHorizontal size={20} /> }
];

const Accessories = () => {
  const { toast } = useToast();

  const handleAddToCart = (productName: string) => {
    toast({
      title: "Added to Cart",
      description: `${productName} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title="Assistive Accessories Store"
          subtitle="Discover our range of high-quality assistive devices designed to enhance independence and improve quality of life. From mobility aids to hearing assistance, we offer products that make daily activities more accessible."
        />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-64 bg-card dark:bg-card/95 p-4 rounded-xl shadow-subtle border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-foreground dark:text-foreground" />
                <h3 className="font-medium text-foreground dark:text-foreground">Filters</h3>
              </div>
              <Button variant="ghost" size="sm" className="text-sm text-assist-600 hover:text-assist-700 dark:text-assist-400 dark:hover:text-assist-500">
                Reset
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-foreground dark:text-foreground">Categories</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.name}`}
                      className="h-4 w-4 rounded border-border text-assist-600 focus:ring-assist-600 dark:border-border dark:bg-card"
                    />
                    <label 
                      htmlFor={`category-${category.name}`} 
                      className="ml-2 text-sm text-foreground dark:text-foreground flex items-center gap-2"
                    >
                      {React.cloneElement(category.icon, { className: "text-assist-600 dark:text-assist-400" })}
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 text-foreground dark:text-foreground">Price Range</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="min-price" className="sr-only">Minimum Price</label>
                  <input
                    type="number"
                    id="min-price"
                    placeholder="Min"
                    className="w-full border border-border bg-background dark:bg-background/50 dark:text-foreground rounded px-3 py-1 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="sr-only">Maximum Price</label>
                  <input
                    type="number"
                    id="max-price"
                    placeholder="Max"
                    className="w-full border border-border bg-background dark:bg-background/50 dark:text-foreground rounded px-3 py-1 text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-foreground dark:text-foreground">Availability</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="in-stock"
                    className="h-4 w-4 rounded border-border text-assist-600 focus:ring-assist-600 dark:border-border dark:bg-card"
                  />
                  <label htmlFor="in-stock" className="ml-2 text-sm text-foreground dark:text-foreground">
                    In Stock Only
                  </label>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6 bg-assist-600 hover:bg-assist-700 dark:bg-assist-600/90 dark:hover:bg-assist-700/90 text-white">
              Apply Filters
            </Button>
          </motion.div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-foreground dark:text-foreground">Products ({products.length})</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground dark:text-muted-foreground">Sort by:</span>
                <select className="text-sm border border-border bg-background dark:bg-background/50 dark:text-foreground rounded px-3 py-1">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col bg-card dark:bg-card/95 border-border">
                    <CardHeader className="pb-2 relative">
                      {product.featured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-500/90 dark:hover:bg-yellow-600/90 text-white">
                          Featured
                        </Badge>
                      )}
                      <div className="aspect-square bg-accent/10 dark:bg-accent/5 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="text-base text-foreground dark:text-foreground">{product.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-accent/50 dark:bg-accent/20 text-foreground dark:text-foreground/80 border-border">
                          {product.category}
                        </Badge>
                        <div className="flex items-center ml-2 text-yellow-500 dark:text-yellow-400">
                          <Star size={14} fill="currentColor" />
                          <span className="ml-1 text-xs">{product.rating}</span>
                          <span className="text-muted-foreground dark:text-muted-foreground text-xs ml-1">({product.reviewCount})</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-medium text-foreground dark:text-foreground">${product.price.toFixed(2)}</span>
                        <div className="flex items-center text-sm text-muted-foreground dark:text-muted-foreground">
                          <Truck size={16} className="mr-1" />
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button 
                        className="w-full bg-assist-600 hover:bg-assist-700 dark:bg-assist-600/90 dark:hover:bg-assist-700/90 text-white"
                        onClick={() => handleAddToCart(product.name)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Accessories;
